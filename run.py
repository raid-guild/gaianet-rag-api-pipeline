from gaianet_rag_api_pipeline.config import ENV_FILE_PATH, get_settings, logger, Settings
from gaianet_rag_api_pipeline.utils import docker_replace_local_service_url, ping_service

import click
from codetiming import Timer
import dotenv
import logging
import os
import pathlib
import re
import shutil


def is_pipeline_setup() -> bool:
    """
    Check if the pipeline environment file is set up.

    This function verifies the existence of the environment file needed to run the pipeline. 
    If the file is not found, an error message is printed to the console indicating that the setup 
    needs to be completed before proceeding.

    Returns:
        bool: True if the environment file exists, False otherwise.

    Side Effects:
        Prints an error message to the console if the environment file is missing.
    """
    env_file = pathlib.Path(ENV_FILE_PATH)
    file_exists = env_file.exists()
    if not file_exists:
        click.echo(
            click.style(
                f"ERROR: {ENV_FILE_PATH} file not found. {click.style('rag-api-pipeline setup', fg='yellow')} {click.style('should be run first.', fg='red')}",
                fg="red"
            ),
            err=True
        )
    return file_exists


def check_services(settings: Settings) -> bool:
    """
    Check the availability of required services (LLM Provider and QdrantDB).

    This function verifies the status of the specified LLM provider and QdrantDB services.
    It attempts to connect to each service endpoint and confirms if they are responsive. 
    The function prints the service status to the console and provides feedback if any service is down.

    Args:
        settings (Settings): The settings object containing configuration for services, 
                             including URLs and provider details.

    Returns:
        bool: True if all required services are up and running; False if any service is down.

    Side Effects:
        - Prints status updates to the console for each service checked.
        - If a service is down, prints error messages indicating which service is unavailable.
    """
    click.echo(click.style("Checking services status...", fg="yellow"))

    # LLM Provider
    service_url = docker_replace_local_service_url(settings.llm_api_base_url, "host.docker.internal")
    service_url = service_url if re.search("(v1)|(v1/)$", service_url) else f"{service_url}/v1"
    service_url += "/models"
    llm_provider_up = ping_service(service_url, settings.llm_provider)
    if not llm_provider_up:
        click.echo(click.style(f"ERROR: LLM Provider {settings.llm_provider} ({service_url}) is down", fg="red"), err=True)
    
    # QdrantDB
    service_url = docker_replace_local_service_url(settings.qdrantdb_url, "qdrant")
    qdrantdb_up = ping_service(service_url, "QdrantDB")
    if not qdrantdb_up:
        click.echo(click.style(f"ERROR: QdrantDB ({service_url}) is down", fg="red"), err=True)

    # Check all services status
    services_ok = llm_provider_up and qdrantdb_up
    if services_ok:
        click.echo(click.style("Required services are up and running!", fg="green"))
    return services_ok


@click.group()
@click.option('--debug', is_flag=True, help="enable logging debug level")
@click.pass_context
def cli(ctx, debug):
    """
    Execute RAG API pipeline tasks.
    """
    click.echo(f"Debug mode is {'on' if debug else 'off'}")
    # ensure that ctx.obj exists and is a dict (in case `cli()` is called
    # by means other than the `if` block below)
    ctx.ensure_object(dict)
    ctx.obj['DEBUG'] = debug
    logger.setLevel(level=logging.INFO if not debug else logging.DEBUG)
    if debug:
        os.environ["AIRBYTE_STRUCTURED_LOGGING"] = "true"


@cli.command()
@click.pass_context
@click.argument("api-manifest-file", type=click.Path(exists=True))
@click.argument("openapi-spec-file", type=click.Path(exists=True))
@click.option("--llm-provider", type=click.Choice(["ollama", "openai"], case_sensitive=True), help="Embedding model provider")
@click.option("--api-key", default=lambda: os.environ.get("API_KEY", ""), help="API Auth key", type=click.STRING, prompt=True, prompt_required=False)
@click.option("--source-manifest-file", default="", help="Source YAML manifest", type=click.Path()) # TODO: fix validation when empty
@click.option("--full-refresh", is_flag=True, help="Clean up cache and extract API data from scratch")
@click.option("--normalized-only", is_flag=True, help="Run pipeline until the normalized data stage")
@click.option("--chunked-only", is_flag=True, help="Run pipeline until the chunked data stage")
@Timer(name="rag-api-pipeline", text="run-all pipeline executed after: {:.2f} seconds", logger=logger.info)
def all(
    ctx,
    api_manifest_file: str,
    openapi_spec_file: str,
    llm_provider: str,
    api_key: str,
    source_manifest_file: str,
    full_refresh: bool,
    normalized_only: bool,
    chunked_only: bool
):
    """
    Run the complete RAG API Pipeline.

    API_MANIFEST_FILE Path to the API manifest YAML file that defines pipeline config settings and API endpoints.

    OPENAPI_SPEC_FILE Path to the OpenAPI YAML specification file.

    \f
    Executes the entire pipeline from extraction to embedding based on the provided configurations and options.

    Args:
        ctx (click.Context): The context object for the CLI.
        api_manifest_file (str): Path to the API manifest YAML file that defines pipeline config settings and API endpoints.
        llm_provider (str): Provider of the embedding model, e.g., "ollama" or "openai".
        api_key (str): API authentication key.
        openapi_spec_file (str): Path to the OpenAPI YAML specification file.
        source_manifest_file (str): Path to the source YAML manifest file. If empty, the API manifest file is used to load data.
        full_refresh (bool): If set, clears the cache and extracts API data from scratch.
        normalized_only (bool): If set, runs the pipeline up to the normalization stage only.
        chunked_only (bool): If set, runs the pipeline up to the chunking stage only.

    Raises:
        Exception: If both `--normalized-only` and `--chunked-only` options are specified.

    """

    if normalized_only and chunked_only:
        raise Exception("Cannot specify both --normalized-only and --chunked-only options")

    logger.info(f"context - {ctx.obj}")

    if not is_pipeline_setup():
        return

    args = dict(
        openapi_spec_file=openapi_spec_file, # NOTICE: CLI param
        source_manifest_file=source_manifest_file # NOTICE: CLI param
    )
    if llm_provider:
        args['llm_provider'] = llm_provider # NOTICE: CLI param over env var
    if api_key:
        args['api_key'] = api_key # NOTICE: CLI param over env var
    
    # TODO: set env_file based on dev/prod
    settings = get_settings(**args)
    logger.info(f"Config settings - {settings.model_dump()}")
    logger.debug(f"Full refresh? - {full_refresh}")
    logger.debug(f"source manifest - {source_manifest_file}")

    if not settings.api_key:
        raise Exception("API_KEY not found")

    if not check_services(settings):
        return

    from gaianet_rag_api_pipeline.loader import api_loader, api_read

    if not source_manifest_file:
        (
            (api_name, api_parameters),
            (source_manifest, endpoints),
            chunking_params
        ) = api_loader(
            manifest_file=pathlib.Path(api_manifest_file),
            openapi_spec_file=pathlib.Path(settings.openapi_spec_file),
            output_folder=settings.output_folder,
        )
    else:
        logger.info(f"Reading api spec form source manifest {source_manifest_file}")
        (
            (api_name, api_parameters),
            (source_manifest, endpoints),
            chunking_params
        ) = api_read(
            source_manifest_file=source_manifest_file,
            manifest_file=pathlib.Path(api_manifest_file),
            openapi_spec_file=pathlib.Path(settings.openapi_spec_file),
        )

    logger.debug(f"api config: {api_name} - {api_parameters}")
    logger.debug(f"endpoints - {endpoints}")
    logger.debug(f"chunking params - {chunking_params}")

    # set airbyte logging level if debug is enabled
    if (ctx.obj['DEBUG']):
        airbyte_logger = logging.getLogger(f"airbyte.{api_name}")
        airbyte_logger.setLevel(logging.DEBUG)

    # create pipeline cache/output folders
    pathlib.Path(f"{settings.output_folder}/{api_name}").mkdir(exist_ok=True)
    pathlib.Path(f"{settings.output_folder}/cache/{api_name}").mkdir(exist_ok=True, parents=True)

    from gaianet_rag_api_pipeline.input import input
    from gaianet_rag_api_pipeline.output import output
    import gaianet_rag_api_pipeline.pipeline as rag_api_pipeline

    # fetch data from endpoints as individual streams
    stream_tables = input(
        api_name=api_name,
        settings=settings,
        endpoints=endpoints,
        source_manifest=source_manifest,
        config=dict(
            api_key=settings.api_key,
            **api_parameters
        ),
        force_full_refresh=full_refresh # NOTICE: CLI param
    )

    # pipeline from streams to normalized|chunked|embeddings data
    output_table = rag_api_pipeline.execute(
        api_name=api_name,
        chunking_params=chunking_params,
        endpoints=endpoints,
        stream_tables=stream_tables,
        settings=settings,
        normalized_only=normalized_only,
        chunked_only=chunked_only
    )

    if not normalized_only and not chunked_only:
        # output to vector db
        output(
            api_name=api_name,
            output_table=output_table,
            settings=settings,
        )

    import pathway as pw

    pw.run(monitoring_level=pw.MonitoringLevel.ALL)


@cli.command()
@click.pass_context
@click.argument("api-manifest-file", type=click.Path(exists=True))
@click.option("--llm-provider", type=click.Choice(["ollama", "openai"], case_sensitive=True), help="Embedding model provider")
@click.option("--normalized-data-file", required=True, help="Normalized data in JSONL format", type=click.Path(exists=True))
@Timer(name="rag-api-pipeline", text="from-normalized pipeline executed after: {:.2f} seconds", logger=logger.info)
def from_normalized(
    ctx,
    api_manifest_file: str,
    llm_provider: str,
    normalized_data_file: str
):
    """
    Execute the RAG API pipeline from normalized data.

    API_MANIFEST_FILE Path to the API manifest YAML file that defines pipeline config settings and API endpoints.

    \f
    Processes the normalized data and generates embeddings using the provided configurations and options.

    Args:
        ctx (click.Context): The context object for the CLI.
        api_manifest_file (str): Path to the API manifest YAML file that defines pipeline config settings and API endpoints.
        llm_provider (str): Provider of the embedding model, e.g., "ollama" or "openai".
        normalized_data_file (str): Path to the JSONL file containing normalized data.
    """

    if not is_pipeline_setup():
        return
    
    args = dict()
    if llm_provider:
        args['llm_provider'] = llm_provider # NOTICE: CLI param over env var
    
    settings = get_settings(*args)

    logger.info(f"Config settings - {settings.model_dump()}")
    logger.debug(f"Data source - {normalized_data_file}")

    if not check_services(settings):
        return

    manifest_file = pathlib.Path(api_manifest_file)

    from gaianet_rag_api_pipeline.input import read_jsonl_source
    from gaianet_rag_api_pipeline.loader import get_dict_field, get_str_field
    from gaianet_rag_api_pipeline.output import output
    from gaianet_rag_api_pipeline.schema import NormalizedAPISchema
    import gaianet_rag_api_pipeline.pipeline as rag_api_pipeline
    
    api_name = get_str_field(
        manifest_file=manifest_file,
        field_id="api_name"
    )

    chunking_params = get_dict_field(
        manifest_file=manifest_file,
        field_id="chunking_params"
    )

    logger.debug(f"chunking params - {chunking_params}")

    # input data
    normalized_table = read_jsonl_source(
        source_file=normalized_data_file,
        schema=NormalizedAPISchema,
        mode="static"
    )

    # chunked data
    chunks_table = rag_api_pipeline.step_2_chunking(
        api_name=api_name,
        input_table=normalized_table,
        chunking_params=chunking_params,
        settings=settings
    )

    # embeddings
    embeddings_table = rag_api_pipeline.step_3_generate_embeddings(
        input_table=chunks_table,
        settings=settings,
    )

    # output to vector db
    output(
        api_name=api_name,
        output_table=embeddings_table,
        settings=settings,
    )

    import pathway as pw

    pw.run(monitoring_level=pw.MonitoringLevel.ALL)


@cli.command()
@click.pass_context
@click.argument("api-manifest-file", type=click.Path(exists=True))
@click.option("--llm-provider", type=click.Choice(["ollama", "openai"], case_sensitive=True), help="Embedding model provider")
@click.option("--chunked-data-file", required=True, help="Chunked data in JSONL format", type=click.Path(exists=True))
@Timer(name="rag-api-pipeline", text="from-chunked pipeline executed after: {:.2f} seconds", logger=logger.info)
def from_chunked(
    ctx,
    api_manifest_file: str,
    llm_provider: str,
    chunked_data_file: str
):
    """
    Execute the RAG API pipeline from chunked data.

    API_MANIFEST_FILE Path to the API manifest YAML file that defines pipeline config settings and API endpoints.

    \f
    Processes chunked data and generates embeddings using the provided configurations and options.

    Args:
        ctx (click.Context): The context object for the CLI.
        api_manifest_file (str): Path to the API manifest YAML file that defines pipeline config settings and API endpoints.
        llm_provider (str): Provider of the embedding model, e.g., "ollama" or "openai".
        chunked_data_file (str): Path to the JSONL file containing chunked data.
    """

    if not is_pipeline_setup():
        return
    
    args = dict()
    if llm_provider:
        args['llm_provider'] = llm_provider # NOTICE: CLI param over env var

    settings = get_settings(**args)

    logger.info(f"Config settings - {settings.model_dump()}")
    logger.debug(f"Data source - {chunked_data_file}")

    if not check_services(settings):
        return

    from gaianet_rag_api_pipeline.input import read_jsonl_source
    from gaianet_rag_api_pipeline.loader import get_dict_field, get_str_field
    from gaianet_rag_api_pipeline.output import output
    from gaianet_rag_api_pipeline.schema import ChunkedDataSchema
    import gaianet_rag_api_pipeline.pipeline as rag_api_pipeline

    api_name = get_str_field(
        manifest_file=pathlib.Path(api_manifest_file),
        field_id="api_name"
    )

    chunking_params = get_dict_field(
        manifest_file=pathlib.Path(api_manifest_file),
        field_id="chunking_params"
    )

    logger.debug(f"chunking params - {chunking_params}")

    # input data
    chunks_table = read_jsonl_source(
        source_file=chunked_data_file,
        schema=ChunkedDataSchema,
        mode="static"
    )

    # embeddings
    embeddings_table = rag_api_pipeline.step_3_generate_embeddings(
        input_table=chunks_table,
        settings=settings,
    )

    # output to vector db
    output(
        api_name=api_name,
        output_table=embeddings_table,
        settings=settings,
    )

    import pathway as pw

    pw.run(monitoring_level=pw.MonitoringLevel.ALL)

