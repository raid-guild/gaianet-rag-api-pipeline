import pathlib
import pathway as pw


def jsonl_serialize(name: str, input_table: pw.Table) -> None:
    folder = "./output" # TODO:
    pw.io.jsonlines.write(input_table, f"{folder}/{name}.jsonl")
