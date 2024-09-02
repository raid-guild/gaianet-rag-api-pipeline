from gaianet_rag_api_pipeline.config import get_settings
from gaianet_rag_api_pipeline.input import input
from gaianet_rag_api_pipeline.loader import api_loader
from gaianet_rag_api_pipeline.output import output
from gaianet_rag_api_pipeline.pipeline import pipeline

import click
import pathlib
import pathway as pw
import os

@click.command(name="api-pipeline")
@click.argument("api-manifest-file", type=click.Path(exists=True))
@click.option("--api-key", default=lambda: os.environ.get("BOARDROOM_API_KEY", ""), help="API Auth key", type=click.STRING, prompt=True, prompt_required=False)
@click.option("--openapi-spec-file", default="config/openapi.yaml", help="OpenAPI YAML spec file", type=click.Path(exists=True), prompt=True, prompt_required=False)
@click.option("--source-manifest-file", default="config/connector.yaml", help="Source YAML manifest", type=click.Path(exists=True), prompt=True, prompt_required=False)
@click.option("--full-refresh", is_flag=True)
def run(
    # api_key: str,
    api_manifest_file: str,
    api_key: str,
    openapi_spec_file: str,
    source_manifest_file: str,
    full_refresh: bool
):
    args = dict(
        openapi_spec_file=openapi_spec_file, # NOTICE: CLI param
        source_manifest_file=source_manifest_file # NOTICE: CLI param
    )
    if api_key:
        args['api_key'] = api_key # NOTICE: CLI param or env var
    
    # TODO: set env_file based on dev/prod
    settings = get_settings(**args)
    print("Config settings", settings.model_dump()) # TODO: use logging
    print("Full refresh?", full_refresh)

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

    print(f"api config: {api_name} - {api_parameters}")
    print(f"endpoints - {endpoints}")
    print(f"chunking params - {chunking_params}")

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

if __name__ == "__main__":
    run()
