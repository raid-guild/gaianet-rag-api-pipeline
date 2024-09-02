from functools import cache, lru_cache
from typing import Literal, Optional

# from dotenv import load_dotenv
from pydantic_settings import BaseSettings, SettingsConfigDict

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
    openapi_spec_file: str
    source_manifest_file: str
    output_folder: str

    gaia_node_api_base_url: str
    gaia_node_api_key: str
    gaia_node_embeddings_model: str
    gaia_node_embeddings_vector_size: int

    qdrantdb_url: str
    qdrantdb_timeout: int
    qdrantdb_distance_fn: Literal["COSINE", "EUCLID", "DOT", "MANHATTAN"]

# @lru_cache()
@cache
def get_settings(**kwargs):
    # load_dotenv(ENV_FILE_PATH)  # make sure variables in .env file are propagated to environment
    return Settings(**kwargs)
