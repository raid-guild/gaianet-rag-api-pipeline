import pathway as pw


def jsonl_serialize(
    filename: str,
    input_table: pw.Table,
    output_folder: str = "./output",
) -> None:
    """
    Serializes a table to a JSON Lines (.jsonl) file.

    This function writes the given table to a JSON Lines file format, saving it to the specified output folder
    with the provided filename. If the output folder is not specified, it defaults to "./output".

    Args:
        filename (str): The name of the file to which the table will be serialized (without extension).
        input_table (pw.Table): The table to be serialized into the JSON Lines format.
        output_folder (str, optional): The directory where the file will be saved. Defaults to "./output".
    """
    pw.io.jsonlines.write(input_table, f"{output_folder}/{filename}.jsonl")
