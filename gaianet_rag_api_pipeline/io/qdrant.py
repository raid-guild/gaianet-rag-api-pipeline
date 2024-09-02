import os.path
import pathway as pw
from qdrant_client import QdrantClient
from qdrant_client.models import Distance, PointStruct, VectorParams
import tarfile
import urllib.request


class QdrantDBVectorStore():

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
        print("VectorDB updated!") # TODO: logger
        try:
            snapshot_rs = self.client.create_snapshot(
                collection_name=self.collection_name
            )
            snapshot_name = snapshot_rs.name
            snapshot_url = f"{self.qdrantdb_url}/collections/{self.collection_name}/snapshots/{snapshot_name}"
            print(f"You can Download a snapshot from {snapshot_url}") # TODO: logger
            (output_file, _) = urllib.request.urlretrieve(
                snapshot_url,
                f"{self.snapshot_output_folder}/{snapshot_name}"
            )
            print(f"Generated snapshot: {output_file}") # TODO: logger
            with tarfile.open(f"{output_file}.tar.gz", "w:gz") as tar:
                tar.add(output_file, arcname=os.path.basename(output_file))
                tar.close()
            print(f"Compressed snapshot: {output_file}.tar.gz") # TODO: logger
        except Exception as error:
            print(f"QdrantDBVectorStore: an error occurred when generating snapshot - {error}") # TODO: logger
            raise error
