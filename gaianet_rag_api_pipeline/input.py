from gaianet_rag_api_pipeline.config import get_settings, logger, Settings
from gaianet_rag_api_pipeline.io.airbyte import AirbyteAPIConnector
from gaianet_rag_api_pipeline.utils import resolve_refs, YamlDataTypes

import airbyte as ab
import copy
import pathlib
import pathway as pw
import typing


def create_endpoint_stream(
    api_name: str,
    cache_name: str,
    cache_dir: str,
    source_manifest: dict,
    stream_id: str,
    autocommit_duration_ms: int,
    config: dict[str, typing.Any] | None = None,
    check_source: bool = True,
    force_full_refresh: bool = False
) -> pw.Table:
    logger.debug(f"Creating endpoint stream for {stream_id}...")
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
        check_source=False, # check source later in the code
    )

    # generate stream schema
    schema_columns = dict()
    schema_spec = resolve_refs(
        data=source_manifest.get("definitions", {}).\
            get(f"{stream_id}_stream", {}),
        root=source_manifest
    ).\
        get("schema_loader", {}).\
        get("schema", {}).\
        get("properties", {})
    for field, meta in schema_spec.items():
        field_type = meta.get('type', "string")
        field_type = field_type if type(field_type) != list else field_type[0]
        dtype = YamlDataTypes[field_type].value
        # NOTICE: using lowercase field name as airbyte returns fields like that
        schema_columns[f"{field.lower()}"] = pw.column_definition(
            dtype=dtype | None,
            # primary_key=(field == "id"), # NOTICE: disabled to use pathway own indexer
            default_value=dtype()
        )
    logger.debug(f"schema columns for {stream_id} stream - {schema_columns}")
    schema = pw.schema_builder(
        columns={
            "_airbyte_raw_id": pw.column_definition(dtype=str),
            "_airbyte_extracted_at": pw.column_definition(dtype=pw.DateTimeNaive),
            "_airbyte_meta": pw.column_definition(dtype=dict),
            "stream": pw.column_definition(dtype=str),
            **schema_columns,
        },
        name=stream_id
    )

    if check_source:
        try:
            stream_connector.check()
        except Exception as error:
            logger.error(f"FATAL error: manifest error when creating {stream_id} stream", exc_info=True)
            raise error

    stream = pw.io.python.read(
        stream_connector,
        schema=schema,
        autocommit_duration_ms=autocommit_duration_ms
    )
    logger.debug(f"Creating endpoint stream for {stream_id} - Done.")

    return stream


def input(
    api_name: str,
    settings: Settings,
    source_manifest: dict,
    endpoints: dict,
    cache_dir: str = "./output/cache",
    config: dict[str, typing.Any] | None = None,
    force_full_refresh: bool = False
) -> typing.List[pw.Table]:
    streams = [details.get("stream_id", "") for endpoint, details in endpoints.items()]
    logger.debug(f"input streams - {streams}")

    check_source = True
    stream_tables = list()
    for stream_id in streams:
        stream = create_endpoint_stream(
            api_name=api_name,
            cache_name=f"{api_name}_{stream_id}_cache",
            cache_dir=f"{cache_dir}/{api_name}",
            source_manifest=copy.deepcopy(source_manifest),
            stream_id=stream_id,
            autocommit_duration_ms=settings.autocommit_duration_ms,
            config=config,
            check_source=check_source,
            force_full_refresh=force_full_refresh,
        )
        stream_tables.append(stream)
        check_source = False # check stream sources only once
    
    return stream_tables


def read_jsonl_source(
    source_file: str,
    schema: pw.Schema,
    mode: typing.Literal["static", "streaming"] = "streaming"
) -> pw.Table:
    return pw.io.jsonlines.read(source_file, schema=schema, mode=mode)
