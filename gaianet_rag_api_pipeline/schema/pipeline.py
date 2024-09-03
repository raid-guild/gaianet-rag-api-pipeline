from gaianet_rag_api_pipeline.schema import AirbyteSchema

from pathway import Json, Schema

class NormalizedAPISchema(AirbyteSchema):
    data: Json
    content: str
    metadata: Json
    nextcursor: str | None

class ChunkedDataSchema(Schema):
    element_id: str 
    text: str
    metadata: Json
    type: str
