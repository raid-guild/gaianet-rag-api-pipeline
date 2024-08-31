from gaianet_rag_api_pipeline.chunking import chunking
from gaianet_rag_api_pipeline.embeddings import embeddings
from gaianet_rag_api_pipeline.preprocessing import preprocessing
from gaianet_rag_api_pipeline.serialize import jsonl_serialize

import pathway as pw
import typing


def pipeline(
    endpoints: dict,
    stream_tables: typing.List[pw.Table]
) -> pw.Table:
    """Preprocessing each endpoint stream."""

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
        # stream = stream_tables[i]
        pw.io.jsonlines.write(stream, f"./output/preview-stream{i}.jsonl")
        preprocessed_streams.append(stream)

    # concat data from all endpoint streams
    master_table = None
    for stream in preprocessed_streams:
        if not master_table:
            master_table = stream
            continue
        master_table = master_table.concat_reindex(stream)

    jsonl_serialize("preprocessed", master_table) # TODO: remove
    chunked_table = chunking(master_table)
    embeddings_table = embeddings(chunked_table)

    return embeddings_table
