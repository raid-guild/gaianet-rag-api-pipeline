from gaianet_rag_api_pipeline.udfs import to_json

import pathway as pw


def pipeline(input_table: pw.Table) -> pw.Table:
    """Your custom logic."""

    # NOTICE: With Airbyte we need to parse data to Json during pre-processing
    input_table = input_table.with_columns(
        data=to_json(input_table.data)
    )

    output_table = input_table.flatten(input_table.data)

    return output_table
