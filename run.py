from gaianet_rag_api_pipeline.config import get_settings
from gaianet_rag_api_pipeline.input import input
from gaianet_rag_api_pipeline.loader import api_loader
from gaianet_rag_api_pipeline.output import output
from gaianet_rag_api_pipeline.pipeline import pipeline

import click
import pathlib
import pathway as pw


@click.command(name="api-pipeline")
@click.argument("api-key", type=click.STRING)
@click.option("--open-api-file", default="config/openapi.yaml", help="OpenAPI YAML spec file", type=click.Path(exists=True))
@click.option("--api-manifest-file", default="config/connector.yaml", help="API YAML manifest", type=click.Path(exists=True))
@click.option("--full-refresh", is_flag=True)
def run(
    api_key: str,
    open_api_file: str,
    api_manifest_file: str,
    full_refresh: bool
):
    # TODO: set env_file based on dev/prod
    settings = get_settings(
        # api_key="a9e2a08afc04b15bd17e20f05373b9e5", # TODO: secret
        api_key=api_key,
        openapi_spec_file=open_api_file, # NOTICE: CLI param
        api_manifest_file=api_manifest_file # NOTICE: CLI param
    ) 
    print("Config settings", settings.model_dump()) # TODO: use logging
    print("Full refresh?", full_refresh)

    # TODO: make sure all dependencies are installed

    # TODO: this should come from config
    api_params = {
        "cname": "aave", # NOTICE: CLI param
        "page_size": 1 # TODO: currently not used
    }

    api_loader() # TODO:

    input_table = input(
        api_name="boardroom_api", # TODO: validate name only contains alphanumeric characters and underscores
        settings=settings,
        config=dict(
            api_key=settings.api_key,
            **api_params
        ),
        source_manifest=pathlib.Path(settings.api_manifest_file), # NOTICE: CLI parma BUT should come as dict after generation
        streams="proposals", # TODO: for now extract proposals only 
        force_full_refresh=full_refresh # NOTICE: CLI param
    )
    output_table = pipeline(input_table)
    output(output_table)

    pw.run(monitoring_level=pw.MonitoringLevel.ALL)

if __name__ == "__main__":
    run()
