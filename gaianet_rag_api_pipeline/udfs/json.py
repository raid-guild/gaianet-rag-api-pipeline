import json
import pathway as pw


@pw.udf(deterministic=True)
async def json_merge(base: pw.Json, content: pw.Json) -> pw.Json:
    return { **base.as_dict(), **content.as_dict()}


@pw.udf(deterministic=True)
async def json_stringify(data: pw.Json) -> str:
    return json.dumps(data.as_dict())


# @pw.udf(deterministic=True)
# async def filter_json(document: pw.Json, fields_to_remove: list[str]) -> pw.Json:
#     data = { **document.as_dict() }
#     # data = { "refId": document["refId"] }
#     for field in fields_to_remove:
#         if field in data:
#             data.pop(field)
#     return data


# @pw.udf(deterministic=True)
# async def json_concat_fields(data: pw.Json, fields: list[str]) -> str:
#     values = [data[fname].as_str() for fname in fields]
#     return "\n\n".join(values)


# @pw.udf(deterministic=True)
# async def json_concat_fields_with_meta(data: pw.Json, fields: list[pw.Json]) -> str:
#     values = list()
#     global_field = None
#     try:
#         for field_meta in fields:
#             meta = field_meta.as_dict()
#             global_field = field_meta
#             label = meta.get("field")
#             field_value = data[label]
#             if not field_value:
#                 continue
#             if meta.get("type") == "array":
#                 values.append(f"{label}: {','.join(field_value.as_list())}")
#             else:
#                 values.append(field_value.as_str())
#     except Exception as error:
#         raise Exception(f"FAILED in {global_field} - {data.as_dict()}", error)
#     return "\n\n".join(values)


# @pw.udf(deterministic=True)
# async def to_json(val: pw.Json) -> pw.Json:
#     return pw.Json(json.loads(val.as_str()))
