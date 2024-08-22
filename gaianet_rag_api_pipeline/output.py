import pathway as pw


def output(output_table):
    pw.io.jsonlines.write(output_table, "output.jsonl")
