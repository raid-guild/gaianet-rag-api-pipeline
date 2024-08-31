import pathway as pw


def jsonl_serialize(
    filename: str,
    input_table: pw.Table,
    output_folder: str = "./output",
) -> None:
    pw.io.jsonlines.write(input_table, f"{output_folder}/{filename}.jsonl")
