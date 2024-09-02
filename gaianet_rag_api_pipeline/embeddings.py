from gaianet_rag_api_pipeline.processor import CustomLiteLLMEmbedder
from gaianet_rag_api_pipeline import Settings

import pathway as pw



def embeddings(
    input_table: pw.Table,
    settings: Settings,
    custom_llm_provider: str = "openai", # litellm will use the .llms.openai.OpenAIChatCompletion to make the request
    cache_strategy: pw.udfs.CacheStrategy | None = None,
) -> pw.Table:

    embedder = CustomLiteLLMEmbedder(
        api_base=settings.gaia_node_api_base_url,
        api_key=settings.gaia_node_api_key, # NOTICE: can't be empty otherwise python API throws an error
        custom_llm_provider=custom_llm_provider,
        model=settings.gaia_node_embeddings_model,
        # TODO: tune parallelization
        capacity=settings.pathway_threads if settings.pathway_threads > 0 else None,
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
