from enum import Enum
from pathway import DateTimeNaive, Json, Schema


class AirbyteSchema(Schema):
    _airbyte_raw_id: str
    _airbyte_extracted_at: DateTimeNaive
    _airbyte_meta: dict
    stream: str


class CursorBasedAPISchema(AirbyteSchema):
    data: Json
    nextcursor: str | None


# TODO: complete implementation
class OffsetBasedAPISchema(AirbyteSchema):
    data: Json


# TODO: complete implementation
class PageBasedAPISchema(AirbyteSchema):
    data: Json


class PaginationSchemas(Enum):
    CursorPagination = CursorBasedAPISchema
    OffsetIncrement = OffsetBasedAPISchema
    PageIncrement = PageBasedAPISchema
