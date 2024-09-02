from gaianet_rag_api_pipeline.config import get_settings
from gaianet_rag_api_pipeline.input import input
from gaianet_rag_api_pipeline.loader import api_loader, get_chunking_params
from gaianet_rag_api_pipeline.output import output
from gaianet_rag_api_pipeline.pipeline import pipeline

import click
import pathlib
import pathway as pw
import os


@click.group()
@click.option('--debug', default=False, help="enable logging debug level")
@click.pass_context
def cli(ctx, debug):
    click.echo(f"Debug mode is {'on' if debug else 'off'}")
    # ensure that ctx.obj exists and is a dict (in case `cli()` is called
    # by means other than the `if` block below)
    ctx.ensure_object(dict)
    ctx.obj['DEBUG'] = debug


@cli.command()
@click.pass_context
@click.argument("api-manifest-file", type=click.Path(exists=True))
@click.option("--api-key", default=lambda: os.environ.get("BOARDROOM_API_KEY", ""), help="API Auth key", type=click.STRING, prompt=True, prompt_required=False)
@click.option("--openapi-spec-file", default="config/openapi.yaml", help="OpenAPI YAML spec file (Default: config/openapi.yaml)", type=click.Path(exists=True), prompt=True, prompt_required=False)
# @click.option("--source-manifest-file", default="config/connector.yaml", help="Source YAML manifest", type=click.Path(exists=True), prompt=True, prompt_required=False)
@click.option("--full-refresh", is_flag=True, help="Clean up cache and extract API data from scratch")
def run_all(
    ctx,
    api_manifest_file: str,
    api_key: str,
    openapi_spec_file: str,
    # source_manifest_file: str,
    full_refresh: bool
):
    """Run the complete RAG API pipeline.

    API_MANIFEST_FILE is the pipeline YAML manifest that defines the Pipeline config settings and API endpoints to extract
    """

    print(f"context - {ctx.obj}") # TODO: logger

    args = dict(
        openapi_spec_file=openapi_spec_file, # NOTICE: CLI param
        # source_manifest_file=source_manifest_file # NOTICE: CLI param
    )
    if api_key:
        args['api_key'] = api_key # NOTICE: CLI param or env var
    
    # TODO: set env_file based on dev/prod
    settings = get_settings(**args)
    print("Config settings", settings.model_dump()) # TODO: logger
    print("Full refresh?", full_refresh) # TODO: logger

    if not settings.api_key:
        raise Exception("API_KEY not found")

    # TODO: make sure all dependencies are installed
    # # Looks like this is only needed when using unstructured auto partition
    # # Make sure libmagic is available
    # LIBMAGIC_AVAILABLE = bool(importlib.util.find_spec("magic"))
    # assert LIBMAGIC_AVAILABLE

    # TODO: omit source generation if source manifest is specified as optional param
    (
        (api_name, pagination_schema, api_parameters),
        (source_manifest, endpoints),
        chunking_params
    ) = api_loader(
        manifest_file=pathlib.Path(api_manifest_file),
        openapi_spec_file=pathlib.Path(settings.openapi_spec_file),
        output_folder=settings.output_folder,
    )

    print(f"api config: {api_name} - {api_parameters}") # TODO: logger
    print(f"endpoints - {endpoints}") # TODO: logger
    print(f"chunking params - {chunking_params}") # TODO: logger

    stream_tables = input(
        api_name=api_name,
        settings=settings,
        endpoints=endpoints,
        pagination_schema=pagination_schema,
        # source_manifest=pathlib.Path(settings.source_manifest_file), # NOTICE: CLI parma BUT should come as dict after generation
        source_manifest=source_manifest,
        config=dict(
            api_key=settings.api_key,
            **api_parameters
        ),
        force_full_refresh=full_refresh # NOTICE: CLI param
    )

    # pipeline from streams to chunked data
    embeddings_table = pipeline(
        api_name=api_name,
        endpoints=endpoints,
        stream_tables=stream_tables,
        chunking_params=chunking_params,
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
@click.option("--normalized-data-file", required=True, help="Normalized data in JSONL format", type=click.Path(exists=True))
def run_chunking(
    ctx,
    api_manifest_file: str,
    normalized_data_file: str
):
    """Execute the RAG API pipeline from the chunking stage

    API_MANIFEST_FILE is the pipeline YAML manifest that defines the Pipeline config settings and API endpoints to extract
    """

    print(f"context - {ctx.obj}") # TODO: logger
    print(f"Data source - {normalized_data_file}")

    chunking_params = get_chunking_params(
        manifest_file=pathlib.Path(api_manifest_file)
    )

    print(f"chunking params - {chunking_params}") # TODO: logger


@cli.command()
@click.pass_context
@click.argument("api-manifest-file", type=click.Path(exists=True))
@click.option("--chunked-data-file", required=True, help="Chunked data in JSONL format", type=click.Path(exists=True))
def run_embeddings(
    ctx,
    api_manifest_file: str,
    chunked_data_file: str
):
    """Execute the RAG API pipeline from the embeddings stage

    API_MANIFEST_FILE is the pipeline YAML manifest that defines the Pipeline config settings and API endpoints to extract
    """

    print(f"context - {ctx.obj}") # TODO: logger
    print(f"Data source - {chunked_data_file}")

    chunking_params = get_chunking_params(
        manifest_file=pathlib.Path(api_manifest_file)
    )

    print(f"chunking params - {chunking_params}") # TODO: logger


def entrypoint():
    cli(obj={})


if __name__ == "__main__":
    entrypoint()
