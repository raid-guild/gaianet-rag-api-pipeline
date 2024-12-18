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
    """
    Creates a data stream from an API endpoint using Airbyte, with caching and schema generation.

    This function sets up a stream to fetch data from an API specified by `api_name`. It configures 
    caching, initializes the API connector, generates the stream schema based on the provided `source_manifest`, 
    and reads the stream data into a table. It supports optional full refresh and source validation.

    Args:
        api_name (str): The name of the API to connect to.
        cache_name (str): The name of the cache to use.
        cache_dir (str): The directory where the cache should be stored.
        source_manifest (dict): The manifest file containing source definitions and schema details.
        stream_id (str): The identifier for the stream to be created.
        autocommit_duration_ms (int): The duration in milliseconds for automatic commit operations.
        config (dict[str, typing.Any], optional): Additional configuration parameters for the API connector. Defaults to None.
        check_source (bool, optional): Whether to validate the source configuration before creating the stream. Defaults to True.
        force_full_refresh (bool, optional): Whether to force a full refresh of the cache. Defaults to False.

    Returns:
        pw.Table: A table representing the data stream with the specified schema.

    Raises:
        Exception: If there is an error while checking the source or creating the stream.

    Notes:
        - The schema for the stream is dynamically generated based on the `source_manifest`.
        - The schema columns are inferred from the stream specification in the manifest.
        - The function logs debug information about the creation process and schema details.
        - If `check_source` is set to True, the source is validated before reading the stream data.
    """
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
            logger.error(f"An error occurred when checking the source connection for {stream_id} stream", exc_info=True)
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
    """
    Creates a list of data streams from API endpoints based on the provided settings and source manifest.

    This function initializes data streams for each endpoint specified in the `endpoints` dictionary using 
    the `create_endpoint_stream` function. It configures caching and handles the full refresh of the cache if 
    specified. The function generates a list of tables representing the streams.

    Args:
        api_name (str): The name of the API to connect to, used for cache naming.
        settings (Settings): Configuration settings including autocommit duration for streams.
        source_manifest (dict): The manifest containing source definitions and schema information.
        endpoints (dict): A dictionary mapping endpoint identifiers to their details, including stream IDs.
        cache_dir (str, optional): The directory where cache files should be stored. Defaults to "./output/cache".
        config (dict[str, typing.Any], optional): Additional configuration parameters for stream creation. Defaults to None.
        force_full_refresh (bool, optional): Whether to force a full refresh of the cache for each stream. Defaults to False.

    Returns:
        typing.List[pw.Table]: A list of tables, each representing a data stream created from the API endpoints.

    Notes:
        - Each stream is created with a unique cache name based on the `api_name` and `stream_id`.
        - The source validation (`check_source`) is performed only once for the first stream.
        - The function logs the stream IDs being processed for debugging purposes.
    """
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
    """
    Reads a JSON Lines (JSONL) file and returns it as a `pw.Table` with the specified schema.

    This function uses the `pw.io.jsonlines.read` method to read data from a JSONL file and create a table 
    with the given schema. The data can be read in either "static" mode, where the entire file is processed 
    at once, or "streaming" mode, where data is processed in a streaming fashion.

    Args:
        source_file (str): The path to the JSONL file to be read.
        schema (pw.Schema): The schema to apply to the data read from the JSONL file.
        mode (typing.Literal["static", "streaming"], optional): The mode in which to read the file. 
            "static" processes the entire file at once, while "streaming" processes the data incrementally. 
            Defaults to "streaming".

    Returns:
        pw.Table: A table containing the data from the JSONL file, formatted according to the provided schema.

    Notes:
        - Ensure that the `source_file` path is correct and the file is accessible.
        - The schema should match the structure of the JSONL data to ensure proper data parsing.
    """

    return pw.io.jsonlines.read(source_file, schema=schema, mode=mode)
