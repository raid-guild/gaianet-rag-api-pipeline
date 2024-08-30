from gaianet_rag_api_pipeline.config import get_settings
from gaianet_rag_api_pipeline.input import input
from gaianet_rag_api_pipeline.loader import api_loader
from gaianet_rag_api_pipeline.output import output
from gaianet_rag_api_pipeline.pipeline import pipeline

import click
import pathlib
import pathway as pw


@click.command(name="api-pipeline")
@click.argument("mapping-manifest-file", type=click.Path(exists=True))
@click.option("--api-key", default=None, help="API Auth key", type=click.STRING)
@click.option("--openapi-spec-file", default="config/openapi.yaml", help="OpenAPI YAML spec file", type=click.Path(exists=True))
@click.option("--api-manifest-file", default="config/connector.yaml", help="API YAML manifest", type=click.Path(exists=True))
@click.option("--full-refresh", is_flag=True)
def run(
    # api_key: str,
    mapping_manifest_file: str,
    api_key: str,
    openapi_spec_file: str,
    api_manifest_file: str,
    full_refresh: bool
):
    # TODO: set env_file based on dev/prod
    # TODO: need to allow optional params to be read through the .env file
    settings = get_settings(
        api_key="a9e2a08afc04b15bd17e20f05373b9e5", # TODO: use click secrets or optional param
        openapi_spec_file=openapi_spec_file, # NOTICE: CLI param
        api_manifest_file=api_manifest_file # NOTICE: CLI param
    ) 
    print("Config settings", settings.model_dump()) # TODO: use logging
    print("Full refresh?", full_refresh)

    # TODO: make sure all dependencies are installed

    # TODO: omit source generation if source manifest is specified as optional param
    (
        (api_name, api_parameters),
        (source_manifest, endpoint_text_fields)
    ) = api_loader(
        mapping_file=pathlib.Path(mapping_manifest_file),
        openapi_spec_file=pathlib.Path(settings.openapi_spec_file),
        output_folder=settings.output_folder,
    )

    print(f"api config: {api_name} - {api_parameters}")
    # print(f"endpoint_text_fields - {endpoint_text_fields}")

    input_table = input(
        api_name=api_name,
        settings=settings,
        config=dict(
            api_key=settings.api_key,
            **api_parameters
        ),
        # source_manifest=pathlib.Path(settings.api_manifest_file), # NOTICE: CLI parma BUT should come as dict after generation
        source_manifest=source_manifest,
        endpoint_text_fields=endpoint_text_fields,
        # streams="proposals", # TODO: for now extract proposals only 
        force_full_refresh=full_refresh # NOTICE: CLI param
    )
    output_table = pipeline(input_table)
    output(output_table)

    pw.run(monitoring_level=pw.MonitoringLevel.ALL)

if __name__ == "__main__":
    run()
