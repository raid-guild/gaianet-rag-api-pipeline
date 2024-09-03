from gaianet_rag_api_pipeline.config import get_settings, Settings
from gaianet_rag_api_pipeline.io.airbyte import AirbyteAPIConnector
from gaianet_rag_api_pipeline.schema import PaginationSchemas

import airbyte as ab
import pathlib
import pathway as pw
import typing


def create_endpoint_stream(
    api_name: str,
    cache_name: str,
    cache_dir: str,
    source_manifest: dict | pathlib.Path,
    stream_id: str,
    pagination_schema: PaginationSchemas,
    autocommit_duration_ms: int,
    config: dict[str, typing.Any] | None = None,
    force_full_refresh: bool = False
) -> pw.Table:
    cache = ab.caches.new_local_cache(
        cache_name=cache_name,
        cache_dir=cache_dir,
        cleanup=force_full_refresh
    )

    stream_connector = AirbyteAPIConnector(
        name=api_name,
        cache=cache,
        config=config,
        source_manifest=source_manifest,
        streams=stream_id,
        force_full_refresh=force_full_refresh,
        check_source=False,
    )

    try: 
        stream_connector.check()
    except Exception as error:
        print(f"FATAL error: manifest error when creating {stream_id} stream", error) # TODO: logger
        raise error

    return pw.io.python.read(
        stream_connector,
        schema=pagination_schema.value,
        autocommit_duration_ms=autocommit_duration_ms
    )


def input(
    api_name: str,
    settings: Settings,
    source_manifest: dict | pathlib.Path,
    endpoints: dict,
    pagination_schema: PaginationSchemas,
    cache_dir: str = "./output/cache",
    config: dict[str, typing.Any] | None = None,
    force_full_refresh: bool = False
) -> typing.List[pw.Table]:
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

    streams = [details.get("stream_id", "") for endpoint, details in endpoints.items()]

    print(f"input streams - {streams}") # TODO: logger

    stream_tables = list()
    for stream_id in streams:
        stream = create_endpoint_stream(
            api_name=api_name,
            cache_name=f"{api_name}_{stream_id}_cache",
            cache_dir=cache_dir,
            source_manifest=source_manifest,
            stream_id=stream_id,
            pagination_schema=pagination_schema,
            autocommit_duration_ms=settings.autocommit_duration_ms,
            config=config,
            force_full_refresh=force_full_refresh,
        )
        stream_tables.append(stream)
    
    return stream_tables


def read_jsonl_source(
    source_file: str,
    schema: pw.Schema
) -> pw.Table:
    return pw.io.jsonlines.read(source_file, schema=schema)
