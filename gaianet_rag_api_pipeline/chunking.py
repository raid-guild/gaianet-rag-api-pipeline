from gaianet_rag_api_pipeline.processor import CustomParseUnstructured
from gaianet_rag_api_pipeline.udfs import concat_fields, json_stringify

import pathway as pw
from typing import Callable, Optional


def chunking(
    input_table: pw.Table,
    mode: str = "elements", # TODO: docs
    post_processors: list[Callable] | None = None, # UDF post-processors to be applied to resulting elements coming from the parser
    # Chunk Parameters 
    # - Common params
    chunking_strategy: str = "by_title",
    include_orig_elements: Optional[bool] = None, # If None default to True
    max_characters: Optional[int] = None, # hard-max chars per chunk
    new_after_n_chars: Optional[int] = None, # soft-max chars per chunk. Cuts off new sections once they reach a length of n characters (soft max). Defaults to  `max_characters` when not specified, which effectively disables any soft window.
    overlap: Optional[int] = None, # specifies the length of a string ("tail") to be drawn from each chunk and prefixed to the next chunk as a context-preserving mechanism. Must be <= `max_characters`
    overlap_all: Optional[bool] = None, # Default to False. Apply overlap between "normal" chunks formed from whole elements and not subject to text-splitting. Could produce `pollution` on clean semantic chunks
    # - by_title specific params
    combine_text_under_n_chars: Optional[int] = None, # Default to `max_characters`. Combines elements until a section reaches a length of n characters. Capped at `new_after_n_chars`
    multipage_sections: Optional[bool] = None # If True, sections can span multiple pages. Defaults to True
) -> pw.Table:
    """
        chunking data
        Details on chunking techniques
        # - basic -> combines sequential elements to maximally fill each chunk
        # - by_title -> preserves section boundaries and optionally page boundaries
        # https://docs.unstructured.io/open-source/core-functionality/chunking
    """
    parser = CustomParseUnstructured(
        mode=mode,
        post_processors=post_processors,
        # Following kwargs will be added to the unstructred_kwargs dict
        chunking_strategy=chunking_strategy,
        include_orig_elements=include_orig_elements,
        max_characters=max_characters,
        new_after_n_chars=new_after_n_chars,
        overlap=overlap,
        overlap_all=overlap_all,
        combine_text_under_n_chars=combine_text_under_n_chars,
        multpage_sections=multipage_sections,
    )

    chunks_table = input_table.select(
        content=parser(
            pw.apply_with_type(
                lambda x: x.encode() if x else b"", bytes,
                concat_fields("\n\nmetadata:\n\n", pw.this.content, json_stringify(pw.this.metadata))
            )
        ),
        metadata=pw.this.metadata
    )
    output_table = chunks_table.flatten(pw.this.content)

    return output_table
