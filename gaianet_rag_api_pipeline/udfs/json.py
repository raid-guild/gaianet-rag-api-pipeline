import json
import pathway as pw


@pw.udf(deterministic=True)
async def json_merge(base: pw.Json, content: pw.Json) -> pw.Json:
    """
    Asynchronously merges two JSON objects into one.

    This function takes two JSON objects (`base` and `content`), converts them to Python dictionaries, 
    and merges them. The result is returned as a new JSON object, with `content` overriding any 
    conflicting keys in `base`.

    Args:
        base (pw.Json): The base JSON object.
        content (pw.Json): The JSON object to be merged with the base.

    Returns:
        pw.Json: A JSON object containing the merged data from both input JSON objects.
    """
    return { **base.as_dict(), **content.as_dict()}


@pw.udf(deterministic=True)
async def json_stringify(data: pw.Json) -> str:
    """
    Asynchronously converts a JSON object to a string.

    This function takes a `pw.Json` object, converts it to a Python dictionary, and then serializes it into
    a JSON-formatted string.

    Args:
        data (pw.Json): The JSON object to be stringified.

    Returns:
        str: A string representation of the input JSON object.
    """
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
