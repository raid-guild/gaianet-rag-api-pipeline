from gaianet_rag_api_pipeline import Settings
from gaianet_rag_api_pipeline.chunking import chunking
from gaianet_rag_api_pipeline.embeddings import embeddings
from gaianet_rag_api_pipeline.preprocessing import preprocessing
from gaianet_rag_api_pipeline.serialize import jsonl_serialize

import pathway as pw
import typing

def step_0_preprocessing(
    api_name: str,
    endpoints: dict,
    stream_tables: typing.List[pw.Table],
    settings: Settings,
) -> typing.List[pw.Table]:
    preprocessed_streams: typing.List[pw.Table] = list()
    for i, (_, details) in enumerate(endpoints.items()):
        text_properties = details.get("text_properties")
        stream = preprocessing(
            input_stream=stream_tables[i],
            text_properties=text_properties
        )
        # serialize pre-processing stage
        jsonl_serialize(
            filename=f"{api_name}_stream_{i}_preprocessed",
            input_table=stream,
            output_folder=f"{settings.output_folder}/{api_name}"
        )
        preprocessed_streams.append(stream)
    
    return preprocessed_streams


def step_1_normalize_streams(
    api_name: str,
    preprocessed_streams: typing.List[pw.Table],
    settings: Settings,
) -> pw.Table:
    normalized_table = None
    for stream in preprocessed_streams:
        if not normalized_table:
            normalized_table = stream
            continue
        normalized_table = normalized_table.concat_reindex(stream)

    # serialize normalized stage
    jsonl_serialize(
        filename=f"{api_name}_normalized",
        input_table=normalized_table,
        output_folder=f"{settings.output_folder}/{api_name}"
    )

    return normalized_table


def step_2_chunking(
    api_name: str,
    input_table: pw.Table,
    chunking_params: dict[str, typing.Any],
    settings: Settings,
) -> pw.Table:

    # TODO: consider other chunking parameters
    chunks_table = chunking(
        input_table=input_table,
        mode=chunking_params.get("mode", "elements"),
        capacity=settings.chunking_batch_capacity,
        encoding=settings.api_data_encoding,
        chunking_strategy=chunking_params.get("chunking_strategy", "by_title"),
        include_orig_elements=chunking_params.get("include_orig_elements", None),
        max_characters=chunking_params.get("max_characters", None),
        new_after_n_chars=chunking_params.get("new_after_n_chars", None),
        overlap=chunking_params.get("overlap", None),
        overlap_all=chunking_params.get("overlap_all", None),
        combine_text_under_n_chars=chunking_params.get("combine_text_under_n_chars", None),
        multipage_sections=chunking_params.get("multipage_sections", None),
    )

    # serialize chunking stage
    jsonl_serialize(
        filename=f"{api_name}_chunked",
        input_table=chunks_table,
        output_folder=f"{settings.output_folder}/{api_name}"
    )

    return chunks_table


def step_3_generate_embeddings(
    input_table: pw.Table,
    settings: Settings,
    cache_strategy: pw.udfs.CacheStrategy | None = None,
) -> pw.Table:
    embeddings_table = embeddings(
        input_table=input_table,
        settings=settings,
        cache_strategy=cache_strategy, # pw.udfs.DefaultCache()
    )

    return embeddings_table


def execute(
    api_name: str,
    chunking_params: dict[str, typing.Any],
    endpoints: dict,
    stream_tables: typing.List[pw.Table],
    settings: Settings,
    normalized_only: typing.Optional[bool] = False,
    chunked_only: typing.Optional[bool] = False
) -> pw.Table:
    """Preprocessing each endpoint stream."""

    output_folder = settings.output_folder

    # preprocess and normalize data from each endpoint stream
    preprocessed_streams: typing.List[pw.Table] = step_0_preprocessing(
        api_name=api_name,
        endpoints=endpoints,
        stream_tables=stream_tables,
        settings=settings
    )

    # concat and normalize data from all endpoint streams
    normalized_table = step_1_normalize_streams(
        api_name=api_name,
        preprocessed_streams=preprocessed_streams,
        settings=settings
    )

    # circuit breaker
    if normalized_only:
        return normalized_table

    # chunking
    chunks_table = step_2_chunking(
        api_name=api_name,
        input_table=normalized_table,
        chunking_params=chunking_params,
        settings=settings
    )

    # circuit breaker
    if chunked_only:
        return chunks_table

    # embeddings
    embeddings_table = step_3_generate_embeddings(
        input_table=chunks_table,
        settings=settings
    )

    return embeddings_table
