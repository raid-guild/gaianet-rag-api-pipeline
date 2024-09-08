from gaianet_rag_api_pipeline.config import logger

import asyncio
import contextvars
from functools import partial, wraps
import inspect
from litellm import (
    client,
    embedding,
    exception_type,
)
from litellm.utils import EmbeddingResponse
from ollama import AsyncClient, Client
from pathway.xpacks.llm.embedders import BaseEmbedder, _monkeypatch_openai_async
from pathway.internals import udfs
from pathway.optional_import import optional_imports


def ollama_client(original_function):

    @wraps(original_function)
    def wrapper(*args, **kwargs):
        try:
            host = kwargs.get("api_base", "http://localhost:11434")
            client = Client(host=host)
            kwargs = {
                "client": client,
                **kwargs,
            }
            return original_function(*args, **kwargs)
        except Exception as error:
            logger.error(error, exc_info=True)
            raise error
    

    @wraps(original_function)
    async def wrapper_async(*args, **kwargs):
        try:
            host = kwargs.get("api_base", "http://localhost:11434")
            client = AsyncClient(host=host)
            kwargs = {
                "client": client,
                **kwargs,
            }
            return await original_function(*args, **kwargs)
        except Exception as error:
            logger.error(error, exc_info=True)
            raise error
    

    is_coroutine = inspect.iscoroutinefunction(original_function)

    # Return the appropriate wrapper based on the original function type
    if is_coroutine:
        return wrapper_async
    else:
        return wrapper


@ollama_client
async def ollama_embedding(*args, **kwargs) -> dict:
    client = kwargs.get("client")
    input = kwargs.get("input")
    model = kwargs.get("model")
    return await client.embeddings(model=model, prompt=input)


@client
async def aembedding(*args, **kwargs) -> EmbeddingResponse:
    """
    Asynchronously calls the `embedding` function with the given arguments and keyword arguments.

    Parameters:
    - `args` (tuple): Positional arguments to be passed to the `embedding` function.
    - `kwargs` (dict): Keyword arguments to be passed to the `embedding` function.

    Returns:
    - `response` (Any): The response returned by the `embedding` function.
    """
    loop = asyncio.get_event_loop()
    model = args[0] if len(args) > 0 else kwargs["model"]
    ### PASS ARGS TO Embedding ###
    kwargs["aembedding"] = True
    
    # custom_llm_provider = None
    custom_llm_provider = kwargs.get("custom_llm_provider", None) # NOTICE: required update

    try:
        # Use a partial function to pass your keyword arguments
        func = partial(embedding, *args, **kwargs)

        # Add the context to the function
        ctx = contextvars.copy_context()
        func_with_context = partial(ctx.run, func)

        # NOTICE: don't need that
        # _, custom_llm_provider, _, _ = get_llm_provider(
        #     model=model, api_base=kwargs.get("api_base", None)
        # )

        if (
            custom_llm_provider == "openai"
            # or custom_llm_provider == "azure"
            # or custom_llm_provider == "xinference"
            # or custom_llm_provider == "voyage"
            # or custom_llm_provider == "mistral"
            # or custom_llm_provider == "custom_openai"
            # or custom_llm_provider == "triton"
            # or custom_llm_provider == "anyscale"
            # or custom_llm_provider == "openrouter"
            # or custom_llm_provider == "deepinfra"
            # or custom_llm_provider == "perplexity"
            # or custom_llm_provider == "groq"
            # or custom_llm_provider == "nvidia_nim"
            # or custom_llm_provider == "volcengine"
            # or custom_llm_provider == "deepseek"
            # or custom_llm_provider == "fireworks_ai"
            # or custom_llm_provider == "ollama"
            # or custom_llm_provider == "vertex_ai"
            # or custom_llm_provider == "databricks"
            # or custom_llm_provider == "watsonx"
        ):  # currently implemented aiohttp calls for just azure and openai, soon all.
            # Await normally
            init_response = await loop.run_in_executor(None, func_with_context)
            if isinstance(init_response, dict):
                response = EmbeddingResponse(**init_response)
            elif isinstance(init_response, EmbeddingResponse):  ## CACHING SCENARIO
                response = init_response
            elif asyncio.iscoroutine(init_response):
                response = await init_response
        else:
            # Call the synchronous function using run_in_executor
            response = await loop.run_in_executor(None, func_with_context)
        if response is not None and hasattr(response, "_hidden_params"):
            response._hidden_params["custom_llm_provider"] = custom_llm_provider
        return response
    except Exception as e:
        custom_llm_provider = custom_llm_provider or "openai"
        raise exception_type(
            model=model,
            custom_llm_provider=custom_llm_provider,
            original_exception=e,
            completion_kwargs=args,
            extra_kwargs=kwargs,
        )


class CustomLiteLLMEmbedder(BaseEmbedder):
    """Pathway wrapper for `litellm.embedding`.

    Model has to be specified either in constructor call or in each application, no default
    is provided. The capacity, retry_strategy and cache_strategy need to be specified
    during object construction. All other arguments can be overridden during application.

    Args:
        - capacity: Maximum number of concurrent operations allowed.
            Defaults to None, indicating no specific limit.
        - retry_strategy: Strategy for handling retries in case of failures.
            Defaults to None, meaning no retries.
        - cache_strategy: Defines the caching mechanism. To enable caching,
            a valid `CacheStrategy` should be provided.
            See `Cache strategy <https://pathway.com/developers/api-docs/udfs#pathway.udfs.CacheStrategy>`_
            for more information. Defaults to None.
        - model: The embedding model to use.
        - timeout: The timeout value for the API call, default 10 mins
        - litellm_call_id: The call ID for litellm logging.
        - litellm_logging_obj: The litellm logging object.
        - logger_fn: The logger function.
        - api_base: Optional. The base URL for the API.
        - api_version: Optional. The version of the API.
        - api_key: Optional. The API key to use.
        - api_type: Optional. The type of the API.
        - custom_llm_provider: The custom llm provider.

    Any arguments can be provided either to the constructor or in the UDF call.
    To specify the `model` in the UDF call, set it to None.

    Example:

    >>> import pathway as pw
    >>> from pathway.xpacks.llm import embedders
    >>> embedder = embedders.LiteLLMEmbedder(model="text-embedding-ada-002")
    >>> t = pw.debug.table_from_markdown('''
    ... txt
    ... Text
    ... ''')
    >>> t.select(ret=embedder(pw.this.txt))
    <pathway.Table schema={'ret': list[float]}>

    >>> import pathway as pw
    >>> from pathway.xpacks.llm import embedders
    >>> embedder = embedders.LiteLLMEmbedder()
    >>> t = pw.debug.table_from_markdown('''
    ... txt  | model
    ... Text | text-embedding-ada-002
    ... ''')
    >>> t.select(ret=embedder(pw.this.txt, model=pw.this.model))
    <pathway.Table schema={'ret': list[float]}>
    """

    def __init__(
        self,
        *,
        capacity: int | None = None,
        retry_strategy: udfs.AsyncRetryStrategy | None = None,
        cache_strategy: udfs.CacheStrategy | None = None,
        model: str | None = None,
        **llmlite_kwargs,
    ):
        with optional_imports("xpack-llm"):
            import litellm  # noqa:F401

        _monkeypatch_openai_async()
        executor = udfs.async_executor(capacity=capacity, retry_strategy=retry_strategy)
        super().__init__(
            executor=executor,
            cache_strategy=cache_strategy,
        )
        self.kwargs = dict(llmlite_kwargs)
        if model is not None:
            self.kwargs["model"] = model

    async def __wrapped__(self, input, **kwargs) -> list[float]:
        """Embed the documents

        Args:
            - input: mandatory, the string to embed.
            - **kwargs: optional parameters, if unset defaults from the constructor
              will be taken.
        """
        # import litellm

        kwargs = {**self.kwargs, **kwargs}

        # NOTICE: custom logic to support ollama
        custom_llm_provider = kwargs.get("custom_llm_provider", None) # NOTICE: required update

        if custom_llm_provider == "ollama":
            ret = await ollama_embedding(input=(input or "."), **kwargs)
            return ret["embedding"]
        else:
            # litellm will use the .llms.openai.OpenAIChatCompletion to make the request
            # ret = await litellm.aembedding(input=[input or "."], **kwargs)
            ret = await aembedding(input=[input or "."], **kwargs) 
            return ret.data[0]["embedding"]
