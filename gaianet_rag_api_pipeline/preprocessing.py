from gaianet_rag_api_pipeline.udfs import filter_json, json_concat_fields_with_meta, to_json

import pathway as pw


def preprocessing(
    input_stream: pw.Table,
    entrypoint_type: str,
    text_properties: list[dict]
) -> pw.Table:
    # NOTICE: With Airbyte we need to parse data to Json during pre-processing
    input_stream = input_stream.with_columns(
        data=to_json(pw.this.data)
    )

    # should flatten results if endpoint returns multiple records
    if entrypoint_type == "array":
        input_stream = input_stream.flatten(input_stream.data)

    # normalization
    preprocess_fields = [p.get("field") for p in text_properties]
    output_table = input_stream.with_columns(
        content=json_concat_fields_with_meta(pw.this.data, text_properties),
        metadata=filter_json(pw.this.data, preprocess_fields),
    )

    return output_table
