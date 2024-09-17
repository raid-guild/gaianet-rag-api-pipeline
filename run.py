from gaianet_rag_api_pipeline.config import get_settings, logger
from gaianet_rag_api_pipeline.input import input, read_jsonl_source
from gaianet_rag_api_pipeline.loader import api_loader, api_read, get_dict_field, get_str_field
from gaianet_rag_api_pipeline.output import output
from gaianet_rag_api_pipeline.schema import ChunkedDataSchema, NormalizedAPISchema
import gaianet_rag_api_pipeline.pipeline as rag_api_pipeline

import click
from codetiming import Timer
import logging
import pathlib
import pathway as pw
import os


@click.group()
@click.option('--debug', is_flag=True, help="enable logging debug level")
@click.pass_context
def cli(ctx, debug):
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
@click.option("--llm-provider", default="openai", type=click.Choice(["ollama", "openai"], case_sensitive=True), show_default=True, help="Embedding model provider")
@click.option("--api-key", default=lambda: os.environ.get("API_KEY", ""), help="API Auth key", type=click.STRING, prompt=True, prompt_required=False)
@click.option("--openapi-spec-file", default="config/openapi.yaml", show_default=True, help="OpenAPI YAML spec file", type=click.Path(exists=True), prompt=True, prompt_required=False)
@click.option("--source-manifest-file", default="", help="Source YAML manifest", type=click.Path()) # TODO: fix validation when empty
@click.option("--full-refresh", is_flag=True, help="Clean up cache and extract API data from scratch")
@click.option("--normalized-only", is_flag=True, help="Run pipeline until the normalized data stage")
@click.option("--chunked-only", is_flag=True, help="Run pipeline until the chunked data stage")
@Timer(name="rag-api-pipeline", text="run-all pipeline executed after: {:.2f} seconds", logger=logger.info)
def run_all(
    ctx,
    api_manifest_file: str,
    llm_provider: str,
    api_key: str,
    openapi_spec_file: str,
    source_manifest_file: str,
    full_refresh: bool,
    normalized_only: bool,
    chunked_only: bool
):
    """Run the complete RAG API pipeline.

    API_MANIFEST_FILE is the pipeline YAML manifest that defines the Pipeline config settings and API endpoints to extract
    """

    if normalized_only and chunked_only:
        raise Exception("Cannot specify both --normalized-only and --chunked-only options")

    logger.info(f"context - {ctx.obj}")

    args = dict(
        llm_provider=llm_provider, # NOTICE: CLI param
        openapi_spec_file=openapi_spec_file, # NOTICE: CLI param
        source_manifest_file=source_manifest_file # NOTICE: CLI param
    )
    if api_key:
        args['api_key'] = api_key # NOTICE: CLI param or env var
    
    # TODO: set env_file based on dev/prod
    settings = get_settings(**args)
    logger.info(f"Config settings - {settings.model_dump()}")
    logger.debug(f"Full refresh? - {full_refresh}")
    logger.debug(f"source manifest - {source_manifest_file}")

    if not settings.api_key:
        raise Exception("API_KEY not found")

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

    pw.run(monitoring_level=pw.MonitoringLevel.ALL)


@cli.command()
@click.pass_context
@click.argument("api-manifest-file", type=click.Path(exists=True))
@click.option("--llm-provider", default="openai", type=click.Choice(["ollama", "openai"], case_sensitive=True), show_default=True, help="Embedding model provider")
@click.option("--normalized-data-file", required=True, help="Normalized data in JSONL format", type=click.Path(exists=True))
@Timer(name="rag-api-pipeline", text="from-normalized pipeline executed after: {:.2f} seconds", logger=logger.info)
def from_normalized(
    ctx,
    api_manifest_file: str,
    llm_provider: str,
    normalized_data_file: str
):
    """Execute the RAG API pipeline normalized data

    API_MANIFEST_FILE is the pipeline YAML manifest that defines the Pipeline config settings and API endpoints to extract
    """
    
    # TODO: set env_file based on dev/prod
    settings = get_settings(llm_provider=llm_provider)

    logger.info(f"Config settings - {settings.model_dump()}")
    logger.debug(f"Data source - {normalized_data_file}")

    manifest_file = pathlib.Path(api_manifest_file)

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

    pw.run(monitoring_level=pw.MonitoringLevel.ALL)


@cli.command()
@click.pass_context
@click.argument("api-manifest-file", type=click.Path(exists=True))
@click.option("--llm-provider", default="openai", type=click.Choice(["ollama", "openai"], case_sensitive=True), show_default=True, help="Embedding model provider")
@click.option("--chunked-data-file", required=True, help="Chunked data in JSONL format", type=click.Path(exists=True))
@Timer(name="rag-api-pipeline", text="from-chunked pipeline executed after: {:.2f} seconds", logger=logger.info)
def from_chunked(
    ctx,
    api_manifest_file: str,
    llm_provider: str,
    chunked_data_file: str
):
    """Execute the RAG API pipeline from (cached) data chunks

    API_MANIFEST_FILE is the pipeline YAML manifest that defines the Pipeline config settings and API endpoints to extract
    """

    # TODO: set env_file based on dev/prod
    settings = get_settings(llm_provider=llm_provider)

    logger.info(f"Config settings - {settings.model_dump()}")
    logger.debug(f"Data source - {chunked_data_file}")

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

    pw.run(monitoring_level=pw.MonitoringLevel.ALL)


def entrypoint():
    cli(obj={})


if __name__ == "__main__":
    entrypoint()
