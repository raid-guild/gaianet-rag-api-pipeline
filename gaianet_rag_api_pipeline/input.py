from gaianet_rag_api_pipeline.config import get_settings, Settings
from gaianet_rag_api_pipeline.io.airbyte import AirbyteAPIConnector
from gaianet_rag_api_pipeline.schema import BoardroomAPI # TODO:

import airbyte as ab
import pathlib
import pathway as pw
import typing


def input(
    api_name: str,
    settings: Settings,
    config: dict[str, typing.Any] | None = None,
    source_manifest: bool | dict | pathlib.Path | str = False,
    streams: str | list[str] | None = None,
    force_full_refresh: bool = False
):
    # settings = get_settings()
    # class InputSchema(pw.Schema):
    #     value: int
    # format="json"
    # return pw.io.python.read(
    #     InfiniteStream(),
    #     schema=InputSchema,
    #     format=format,
    #     autocommit_duration_ms=get_settings().autocommit_duration_ms,
    # )

    cache = ab.caches.new_local_cache(
        cache_name=f"{api_name}_cache",
        cache_dir='./connector_cache', # NOTICE: parametrize
        cleanup=force_full_refresh # NOTICE: CLI param
    )

    api_connector = AirbyteAPIConnector(
        name=api_name,
        cache=cache,
        config=config,
        source_manifest=source_manifest,
        # streams="proposals", # NOTICE: doing just an individual stream
        streams=streams,
        force_full_refresh=force_full_refresh, # NOTICE: CLI param
        check_source=False, # NOTICE: enforce to not check manifest during initialization
    )

    valid_manifest = False # TODO: improve

    try: 
        api_connector.check()
        valid_manifest = True
    except e:
        # TODO: usse logging
        print("FATAL error: manifest error", e)

    if valid_manifest: # TODO: improve
        return pw.io.python.read(
            api_connector,
            schema=BoardroomAPI # TODO:
        )
