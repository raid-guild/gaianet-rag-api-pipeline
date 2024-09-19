from gaianet_rag_api_pipeline import Settings
from gaianet_rag_api_pipeline.io import QdrantDBVectorStore

import pathway as pw
from qdrant_client.models import Distance


def output(
    api_name: str,
    output_table: pw.Table,
    settings: Settings,
) -> None:
    """
    Upload data from a table to a Qdrant vector database.

    This function initializes a Qdrant vector store with the given settings and uploads the
    contents of the provided table to the vector database. The vector database is configured
    with parameters such as collection name, URL, embedding vector size, distance function,
    and timeout settings. The function subscribes to the table and performs upsert operations
    to the Qdrant vector store.

    Args:
        api_name (str): The name of the API used to generate the collection name for the vector store.
        output_table (pw.Table): The table containing the data to be uploaded to the vector database.
        settings (Settings): Configuration settings for connecting to the Qdrant database, including
        URL, embedding vector size, distance function, and timeout settings.
    """
    vector_db = QdrantDBVectorStore(
        collection_name=f"{api_name}_collection",
        qdrantdb_url=settings.qdrantdb_url,
        embedding_vector_size=settings.llm_embeddings_vector_size,
        distance=Distance[settings.qdrantdb_distance_fn],
        qdrant_timeout=settings.qdrantdb_timeout,
        snapshot_output_folder=f"{settings.output_folder}/{api_name}",
    )

    pw.io.subscribe(output_table, vector_db.upsert_vector, vector_db.on_end)
