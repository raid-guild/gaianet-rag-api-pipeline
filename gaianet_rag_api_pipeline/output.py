import pathway as pw


def output(output_table):
    folder = "./output"
    pw.io.jsonlines.write(output_table, f"{folder}/output.jsonl")
