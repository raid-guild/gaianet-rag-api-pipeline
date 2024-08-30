from gaianet_rag_api_pipeline.chunking import chunking
from gaianet_rag_api_pipeline.embeddings import embeddings
from gaianet_rag_api_pipeline.preprocessing import preprocessing
from gaianet_rag_api_pipeline.serialize import jsonl_serialize

import pathway as pw


def pipeline(input_table: pw.Table) -> pw.Table:
    """Your custom logic."""

    preprocessed_table = preprocessing(input_table)
    jsonl_serialize("preprocessed", preprocessed_table) # TODO: remove
    chunked_table = chunking(preprocessed_table)
    embeddings_table = embeddings(chunked_table)

    return embeddings_table
