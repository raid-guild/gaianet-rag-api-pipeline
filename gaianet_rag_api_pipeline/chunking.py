from gaianet_rag_api_pipeline.processor import CustomParseUnstructured
from gaianet_rag_api_pipeline.udfs import concat_fields, json_merge, json_stringify

import pathway as pw
from typing import Callable, Optional


def chunking(
    input_table: pw.Table,
    mode: str = "elements", # TODO: docs
    post_processors: list[Callable] | None = None, # UDF post-processors to be applied to resulting elements coming from the parser
    capacity: int | None = None, # udf workers for async execution
    # Input params
    encoding: str = 'utf-8',
    # Chunk Parameters 
    # - Common params
    chunking_strategy: str = "by_title",
    include_orig_elements: Optional[bool] = None, # If None default to True
    max_characters: Optional[int] = None, # hard-max chars per chunk. (default=500)
    new_after_n_chars: Optional[int] = None, # soft-max chars per chunk. Cuts off new sections once they reach a length of n characters (soft max). Defaults to  `max_characters` when not specified, which effectively disables any soft window.
    overlap: Optional[int] = None, # specifies the length of a string ("tail") to be drawn from each chunk and prefixed to the next chunk as a context-preserving mechanism. Must be <= `max_characters` (default=0)
    overlap_all: Optional[bool] = None, # Default to False. Apply overlap between "normal" chunks formed from whole elements and not subject to text-splitting. Could produce `pollution` on clean semantic chunks
    # - by_title specific params
    combine_text_under_n_chars: Optional[int] = None, # Default to `max_characters`. Combines elements until a section reaches a length of n characters. Capped at `new_after_n_chars`. Setting to `0` will disable section combining
    multipage_sections: Optional[bool] = None # If True, sections can span multiple pages. Defaults to True
) -> pw.Table:
    """
    Splits and chunks input data from a table based on a specified chunking strategy and parameters.

    This function applies different chunking techniques to the `input_table`, allowing for both basic
    and advanced chunking strategies, such as splitting text based on character length, section titles, 
    and page boundaries. It also supports overlap between chunks for better context preservation.

    Args:
        input_table (pw.Table): The input table containing the data to be chunked.
        mode (str, optional): Specifies the mode for parsing the data, such as "elements". Defaults to "elements".
        post_processors (list[Callable], optional): A list of UDF post-processors applied to the resulting elements from the parser. Defaults to None.
        capacity (int, optional): Specifies the number of UDF workers for asynchronous execution. Defaults to None.
        encoding (str, optional): Encoding used for the input data. Defaults to 'utf-8'.
        chunking_strategy (str, optional): Strategy for chunking the data (e.g., "by_title"). Defaults to "by_title".
        include_orig_elements (Optional[bool], optional): Whether to include the original elements in the chunked output. Defaults to None (which behaves as True).
        max_characters (Optional[int], optional): The hard limit on characters per chunk. Defaults to None (500).
        new_after_n_chars (Optional[int], optional): The soft limit for characters per chunk, where new sections will start. Defaults to None.
        overlap (Optional[int], optional): The number of characters to overlap between chunks for context preservation. Defaults to None (0).
        overlap_all (Optional[bool], optional): Whether to apply overlap to all chunks. Defaults to False.
        combine_text_under_n_chars (Optional[int], optional): Combines text elements until the section reaches a certain character count. Defaults to `max_characters`.
        multipage_sections (Optional[bool], optional): Whether sections can span multiple pages. Defaults to True.

    Returns:
        pw.Table: A table containing the chunked output data, with the resulting text and metadata.

    Notes:
        - The `chunking_strategy` supports multiple methods:
            - "basic" combines sequential elements to fill each chunk.
            - "by_title" preserves section boundaries and optionally page boundaries.
        - You can configure chunking behavior with parameters like `max_characters`, `new_after_n_chars`, and `overlap`.
        - For more information on chunking techniques, see the [Unstructured.io documentation](https://docs.unstructured.io/open-source/core-functionality/chunking).
    """
    parser = CustomParseUnstructured(
        mode=mode,
        post_processors=post_processors,
        capacity=capacity if capacity > 0 else None,
        # Following kwargs will be added to the unstructred_kwargs dict
        # > input params
        encoding=encoding,
        # > chunking params
        chunking_strategy=chunking_strategy,
        include_orig_elements=include_orig_elements,
        max_characters=max_characters,
        new_after_n_chars=new_after_n_chars,
        overlap=overlap,
        overlap_all=overlap_all,
        combine_text_under_n_chars=combine_text_under_n_chars,
        multpage_sections=multipage_sections,
    )

    chunks_table_preview = input_table.select(
        content=parser(
            pw.apply_with_type(
                lambda x: x.encode() if x else b"", bytes,
                concat_fields("\n\nmetadata:\n\n", pw.this.content, json_stringify(pw.this.metadata))
            )
        ),
        metadata=pw.this.metadata
    )
    chunks_table = chunks_table_preview.flatten(pw.this.content)

    # build base chunk metadata
    output_table = chunks_table.select(
        element_id=pw.this.content.get("element_id", default=pw.Json("")).as_str(),
        text=pw.this.content.get("text", default=pw.Json("")).as_str(),
        metadata=json_merge(pw.this.metadata, pw.this.content["metadata"]),
        type=pw.this.content.get("type", default=pw.Json("")).as_str(),
    )

    return output_table
