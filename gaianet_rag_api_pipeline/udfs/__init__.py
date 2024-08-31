from .json import (
    filter_json,
    json_concat_fields,
    json_concat_fields_with_meta,
    json_merge,
    json_stringify, to_json
)
from .reducers import JSONAccumulator

import json
import pathway as pw


json_reducer = pw.reducers.udf_reducer(JSONAccumulator)


@pw.udf
def concat_fields(separator: str, *fields) -> str:
    return f"{separator}".join(fields)


__all__ = [
    "concat_fields",
    "filter_json",
    "json_concat_fields",
    "json_concat_fields_with_meta",
    "json_merge",
    "json_reducer"
    "json_stringify",
    "to_json",
]
