from gaianet_rag_api_pipeline import Settings
from gaianet_rag_api_pipeline.chunking import chunking
from gaianet_rag_api_pipeline.embeddings import embeddings
from gaianet_rag_api_pipeline.preprocessing import preprocessing
from gaianet_rag_api_pipeline.serialize import jsonl_serialize

import pathway as pw
import typing


def pipeline(
    api_name: str,
    endpoints: dict,
    stream_tables: typing.List[pw.Table],
    settings: Settings,
) -> pw.Table:
    """Preprocessing each endpoint stream."""

    output_folder = settings.output_folder

    # preprocess and normalize data from each endpoint stream
    preprocessed_streams: typing.List[pw.Table] = list()
    for i, (_, details) in enumerate(endpoints.items()):
        entrypoint_type = details.get("entrypoint_type")
        text_properties = details.get("text_properties")
        stream = preprocessing(
            input_stream=stream_tables[i],
            entrypoint_type=entrypoint_type,
            text_properties=text_properties
        )
        # serialize pre-processing stage
        jsonl_serialize(
            filename=f"{api_name}_stream_{i}_preprocessed",
            input_table=stream
        )
        preprocessed_streams.append(stream)

    # concat and normalize data from all endpoint streams
    normalized_table = None
    for stream in preprocessed_streams:
        if not normalized_table:
            normalized_table = stream
            continue
        normalized_table = normalized_table.concat_reindex(stream)

    # serialize normalized stage
    jsonl_serialize(
        filename=f"{api_name}_normalized",
        input_table=normalized_table
    )

    # chunking
    # TODO: consider other chunking parameters
    chunks_table = chunking(
        input_table=normalized_table,
    )

    # serialize chunking stage
    jsonl_serialize(
        filename=f"{api_name}_chunked",
        input_table=chunks_table
    )

    # embeddings
    embeddings_table = embeddings(chunks_table)

    return embeddings_table
