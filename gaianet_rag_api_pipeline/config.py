from functools import cache, lru_cache
import logging
from typing import Literal, Optional

from pydantic_settings import BaseSettings, SettingsConfigDict


logger = logging.getLogger(name="rag-api-pipeline")


ENV_FILE_PATH = "config/.env"
SECRETS_PATH = "config/secrets"


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        case_sensitive=False,
        env_file=ENV_FILE_PATH,
        env_file_encoding="utf-8",
        secrets_dir=SECRETS_PATH
    )

    #
    # env vars
    #
    autocommit_duration_ms: int
    pathway_threads: int
    pathway_retry_max_attempts: int
    pathway_retry_delay_ms: int

    api_key: str
    api_data_encoding: str
    openapi_spec_file: str
    source_manifest_file: str
    output_folder: str

    llm_api_base_url: str
    llm_api_key: str
    llm_embeddings_model: str
    llm_embeddings_vector_size: int
    llm_provider: Literal["ollama", "openai"] # NOTICE: gaianet offers an openai compatible API

    qdrantdb_url: str
    qdrantdb_timeout: int
    qdrantdb_distance_fn: Literal["COSINE", "EUCLID", "DOT", "MANHATTAN"]

# @lru_cache()
@cache
def get_settings(**kwargs):
    # load_dotenv(ENV_FILE_PATH)  # make sure variables in .env file are propagated to environment
    return Settings(**kwargs)
