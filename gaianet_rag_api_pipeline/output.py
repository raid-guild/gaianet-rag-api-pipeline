from gaianet_rag_api_pipeline import Settings
from gaianet_rag_api_pipeline.io import QdrantDBVectorStore

import pathway as pw
from qdrant_client.models import Distance


def output(
    api_name: str,
    output_table: pw.Table,
    settings: Settings,
) -> None:

    vector_db = QdrantDBVectorStore(
        collection_name=f"{api_name}_collection",
        qdrantdb_url=settings.qdrantdb_url,
        embedding_vector_size=settings.gaia_node_embeddings_vector_size,
        distance=Distance[settings.qdrantdb_distance_fn],
        qdrant_timeout=settings.qdrantdb_timeout,
        snapshot_output_folder=f"{settings.output_folder}/{api_name}",
    )

    pw.io.subscribe(output_table, vector_db.upsert_vector, vector_db.on_end)
