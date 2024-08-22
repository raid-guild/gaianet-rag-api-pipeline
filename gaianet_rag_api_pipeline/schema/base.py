from pathway import DateTimeNaive, Json, Schema


class AirbyteSchema(Schema):
    _airbyte_raw_id: str
    _airbyte_extracted_at: DateTimeNaive
    _airbyte_meta: dict


# TODO: define general schema name with different pagination strategies
class BoardroomAPI(AirbyteSchema):
    stream: str
    data: Json
    nextcursor: str | None
