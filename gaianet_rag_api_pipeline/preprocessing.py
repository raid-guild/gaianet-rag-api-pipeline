from gaianet_rag_api_pipeline.config import logger
import pandas as pd
import pathway as pw
import time


def preprocessing(
    input_stream: pw.Table,
    text_properties: list[dict]
) -> pw.Table:
    """
    Pre-processes a table by concatenating text fields and converting metadata for further stages.

    This function takes a table and a list of text properties, concatenates specified text fields into
    a single string, and converts other fields into metadata. It applies necessary type conversions and
    handles special fields to avoid parsing errors.

    Args:
        input_stream (pw.Table): The input table containing the data to be preprocessed.
        text_properties (list[dict]): A list of dictionaries specifying the text properties, each containing
        a "field" key that indicates which columns should be concatenated.

    Returns:
        pw.Table: A table with two columns: "content" containing the concatenated text and "metadata" containing
                  the remaining fields as metadata.
    """
    text_columns = [t.get("field") for t in text_properties]

    normalized_schema = pw.schema_from_types(content=str, metadata=pw.Json)

    @pw.pandas_transformer(output_schema=normalized_schema)
    def preprocess_table(table: pd.DataFrame) -> pd.DataFrame:
        columns = set(table.columns)
        # make sure correct dtypes are used
        table = table.convert_dtypes()
        # concat text properties into a single string
        table["preprocessed_text"] = table[text_columns].\
            fillna(value="").\
            map(str).\
            agg("\n\n".join, axis=1).\
            to_list()

        # NOTICE: transform pw Timestamp values to string to avoid parsing errors
        if "_airbyte_extracted_at" in columns:
            table["_airbyte_extracted_at"] = table["_airbyte_extracted_at"].apply(str)
        
        # NOTICE: str transform to avoid parsing errors
        if "id" in columns:
            table["id"] = table["id"].apply(str)

        # other fields go as metadata properties
        table["preprocessed_metadata"] = table[list(columns - set(text_columns))].to_dict(orient="records")

        # get preprocessed table to be forwarded to the streams normalization stage
        preprocessed_table = table[["preprocessed_text", "preprocessed_metadata"]]
        preprocessed_table.rename(
            columns={"preprocessed_text": "content", "preprocessed_metadata": "metadata"},
            inplace=True
        )
        return preprocessed_table

    output_table = preprocess_table(input_stream)

    return output_table
