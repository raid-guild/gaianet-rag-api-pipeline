import pathway as pw

@pw.udf(deterministic=True)
async def concat_fields(separator: str, *fields) -> str:
    """
    Asynchronously concatenates multiple fields into a single string, using a specified separator.

    This function takes a variable number of fields and joins them into one string, with the specified 
    `separator` placed between each field.

    Args:
        separator (str): The string used to separate the fields during concatenation.
        *fields: Variable-length argument list of fields (strings) to be concatenated.

    Returns:
        str: A single string with the fields concatenated and separated by the specified separator.
    """
    return f"{separator}".join(fields)
