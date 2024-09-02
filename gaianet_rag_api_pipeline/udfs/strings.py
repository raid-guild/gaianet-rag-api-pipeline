import pathway as pw

@pw.udf(deterministic=True)
async def concat_fields(separator: str, *fields) -> str:
    return f"{separator}".join(fields)
