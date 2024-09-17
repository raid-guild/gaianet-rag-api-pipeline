from pathway import DateTimeNaive, Schema


class AirbyteSchema(Schema):
    _airbyte_raw_id: str
    _airbyte_extracted_at: DateTimeNaive
    _airbyte_meta: dict
    stream: str
