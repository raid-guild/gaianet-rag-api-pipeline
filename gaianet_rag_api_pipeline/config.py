from functools import cache, lru_cache
from typing import Literal

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
    input_connector: Literal["python", "redpanda"] # TODO:remove
    autocommit_duration_ms: int
    pathway_threads: int

    api_key: str
    openapi_spec_file: str
    api_manifest_file: str
    output_folder: str


# @lru_cache()
@cache
def get_settings(**kwargs):
    # load_dotenv(ENV_FILE_PATH)  # make sure variables in .env file are propagated to environment
    return Settings(**kwargs)
