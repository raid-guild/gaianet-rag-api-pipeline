from gaianet_rag_api_pipeline.config import logger

import os.path
import pathway as pw
from qdrant_client import QdrantClient
from qdrant_client.models import Distance, PointStruct, VectorParams
import tarfile
import urllib.request


class QdrantDBVectorStore():
    """
    QdrantDBVectorStore provides a wrapper around the Qdrant vector database client, enabling 
    management of a vector store including insertion of vectors and snapshot generation.

    Attributes:
        client (QdrantClient): Instance of the QdrantClient used for database interactions.
        collection_name (str): Name of the Qdrant collection where vectors are stored.
        counter (int): Counter for tracking the number of vectors inserted into the collection.
        qdrantdb_url (str): URL of the Qdrant database instance.
        snapshot_output_folder (str): Directory where snapshots of the Qdrant collection are stored.
    """

    client: QdrantClient
    collection_name: str
    counter: int = 0
    qdrantdb_url: str
    snapshot_output_folder: str

    def __init__(
        self,
        collection_name: str,
        qdrantdb_url: str,
        embedding_vector_size: int,
        distance: Distance = Distance.COSINE,
        qdrant_timeout: int = 60,
        snapshot_output_folder: str = "./output",
    ):
        """
        Args:
            collection_name (str): Name of the Qdrant collection to store vectors.
            qdrantdb_url (str): URL of the Qdrant database instance.
            embedding_vector_size (int): Size of the embedding vectors to be stored.
            distance (Distance, optional): Distance metric used for comparing vectors. Defaults to `Distance.COSINE`.
            qdrant_timeout (int, optional): Timeout in seconds for Qdrant client requests. Defaults to 60 seconds.
            snapshot_output_folder (str, optional): Directory for storing collection snapshots. Defaults to "./output".
        """
        self.collection_name = collection_name
        self.qdrantdb_url = qdrantdb_url
        self.client = QdrantClient(url=self.qdrantdb_url, timeout=qdrant_timeout)
        self.client.delete_collection(collection_name=self.collection_name) # TODO: how to create if not exists
        self.client.create_collection(
            collection_name=self.collection_name,
            vectors_config=VectorParams(size=embedding_vector_size, distance=distance),
        )
        self.snapshot_output_folder = snapshot_output_folder
        

    def upsert_vector(self, key: pw.Pointer, row: pw.Json, time: int, is_addition: bool):
        """Inserts or updates a vector in the Qdrant collection."""
        operation_info = self.client.upsert(
            collection_name=self.collection_name,
            wait=True,
            points=[
                PointStruct(
                    id=self.counter,
                    vector=row['embedding'],
                    payload={
                        "source": row['text'],
                        "metadata": row['metadata'].as_dict(),
                    }),
            ],
        )
        
        # print(f"new vector: {key} - {operation_info}")
        # TODO: break if not succeeed
        self.counter += 1 # TODO: better indexing (e.g. uuid)
    
    def on_end(self):
        """
        Generates a snapshot of the current Qdrant collection and saves it to the snapshot output folder.
        The snapshot is compressed into a `.tar.gz` archive.

        Raises:
            Exception: If any error occurs during snapshot creation.
        """
        logger.debug("VectorDB updated!")
        try:
            snapshot_rs = self.client.create_snapshot(
                collection_name=self.collection_name
            )
            snapshot_name = snapshot_rs.name
            snapshot_url = f"{self.qdrantdb_url}/collections/{self.collection_name}/snapshots/{snapshot_name}"
            logger.info(f"You can Download a snapshot from {snapshot_url}")
            (output_file, _) = urllib.request.urlretrieve(
                snapshot_url,
                f"{self.snapshot_output_folder}/{snapshot_name}"
            )
            logger.info(f"Snapshot downloaded to: {output_file}")
            with tarfile.open(f"{output_file}.tar.gz", "w:gz") as tar:
                tar.add(output_file, arcname=os.path.basename(output_file))
                tar.close()
            logger.info(f"Compressed snapshot: {output_file}.tar.gz")
        except Exception as error:
            logger.error(f"QdrantDBVectorStore: an error occurred when generating snapshot", exc_info=True)
            raise error
