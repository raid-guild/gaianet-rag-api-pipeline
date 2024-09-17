# from gaianet_rag_api_pipeline.schema import AirbyteSchema

from pathway import Json, Schema

# TODO: having issues with parsing AirbyteSchema._airbyte_extracted_at
class NormalizedAPISchema(Schema):
    data: Json
    content: str
    metadata: Json
    nextcursor: str | None

class ChunkedDataSchema(Schema):
    element_id: str 
    text: str
    metadata: Json
    type: str
