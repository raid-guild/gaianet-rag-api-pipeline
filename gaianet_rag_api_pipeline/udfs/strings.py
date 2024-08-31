import pathway as pw

@pw.udf
def concat_fields(separator: str, *fields) -> str:
    return f"{separator}".join(fields)
