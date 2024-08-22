from gaianet_rag_api_pipeline.udfs.reducers import JSONAccumulator

import json
import pathway as pw


json_reducer = pw.reducers.udf_reducer(JSONAccumulator)


@pw.udf
def append_parent_id(content: pw.Json, parent_id: str) -> pw.Json:
    data = { "parent_id": parent_id, **content.as_dict() }
    return data


@pw.udf
def to_json(val: pw.Json) -> pw.Json:
    return pw.Json(json.loads(val.as_str()))


@pw.udf
def filter_document(document: pw.Json, fields: list[str]) -> pw.Json:
    data = { **document.as_dict() }
    # data = { "refId": document["refId"] }
    for field in fields:
        if field in data:
            data.pop(field)
    return data
