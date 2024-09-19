from gaianet_rag_api_pipeline.processor import CustomLiteLLMEmbedder
from gaianet_rag_api_pipeline import Settings

import pathway as pw


def embeddings(
    input_table: pw.Table,
    settings: Settings,
    cache_strategy: pw.udfs.CacheStrategy | None = None,
) -> pw.Table:
    """
    Generates embeddings for the text in the input table using a custom LLM embedder.

    This function applies an embedding model to the text data in the `input_table`, producing vector embeddings 
    based on the provided LLM settings. It supports batch processing, retry strategies for handling failures, 
    and optional caching to optimize performance.

    Args:
        input_table (pw.Table): The table containing the input data with at least a `text` and `metadata` column.
        settings (Settings): Configuration settings for the embedding process, including the API base URL, API key, 
                             LLM provider, model to use, and retry strategies.
        cache_strategy (pw.udfs.CacheStrategy, optional): An optional caching strategy to reuse computed embeddings. 
                                                         Defaults to None.
    """
    embedder = CustomLiteLLMEmbedder(
        api_base=settings.llm_api_base_url,
        api_key=settings.llm_api_key, # NOTICE: can't be empty otherwise python API throws an error
        custom_llm_provider=settings.llm_provider,
        model=settings.llm_embeddings_model,
        capacity=settings.embeddings_batch_capacity if settings.embeddings_batch_capacity > 0 else None,
        retry_strategy=pw.asynchronous.udfs.FixedDelayRetryStrategy(
            max_retries=settings.pathway_retry_max_attempts,
            delay_ms=settings.pathway_retry_delay_ms
        ),
        cache_strategy=cache_strategy
    )

    vector_embeddings = input_table.select(
        text=pw.this.text,
        embedding=embedder(pw.this.text),
        metadata=pw.this.metadata,
    )

    return vector_embeddings
