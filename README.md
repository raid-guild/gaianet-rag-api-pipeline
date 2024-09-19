# GaiaNet x RAG API Pipeline

`rag-api-pipeline` is a Python-based data pipeline tool that allows you to easily generate a vector knowledge base from any REST API data source. The
resulting database snapshot can be then plugged-in into a Gaia node's LLM model with a prompt and provide contextual responses to user queries using RAG 
(Retrieval Augmented Generation).

The following sections help you to quickly setup and execute the pipeline on your REST API. If you're looking more in-depth information about how to use 
thes tool, tech stack and/or how it works under the hood, check the content menu on the left.

## System Requirements

- Poetry ([Docs](https://python-poetry.org/docs/))
- Python 3.11.x
- (Optional): a Python virtual environment manager or your preference (e.g. conda, venv)
- Docker and Docker compose
- Qdrant vector database ([Docs](https://qdrant.tech/documentation/))
- LLM model provider (either a Gaianet node or Ollama)

## Setup Instructions

### 1. Clone this repository

Git clone or download this repository to your local.

### 2. Activate your virtual environment

If using a custom virtual environment, you should activate your virtual environment, otherwise poetry will handle the environment for you

### 3. Install project dependencies

Navigate to the directory where this repository was cloned/download and execute the following on a terminal:

```bash [terminal]
poetry install
```

### 4. Set environment variables

Copy `config/.env/sample` into `config/.env` file and set environment variables accordingly. Check the [environment variables](#environment-variables) section 
for details.

### 5. Define your API Pipeline manifest

Define the pipeline manifest for your REST API you're looking to extract data from. Check how to define an API pipeline manifest in 
[Defining an API Pipeline Manifest](docs/pages/manifest-definition.mdx) for details, or take a look at the in-depth review of the sample manifests available in 
[API Examples](docs/pages/apis.mdx).

### 6. Set the REST API Key

Set the REST API key in a `config/secrets/api_key` file, or specify it using the `--api-key` as argument to the CLI

### 7. Setup a Qdrant DB instance

Get the base URL of your Qdrant Vector DB or deploy a local `Qdrant` ([Docs](https://qdrant.tech/documentation/)) vector database instance using docker:

```bash [terminal]
# IMPORTANT: make sure you use `qdrant:v1.10.1` for compatibility with Gaianet node
docker run -p 6333:6333 -p 6334:6334 -v ./qdrant_dev:/qdrant/storage:z qdrant/qdrant:v1.10.1
```

### 8. Select and Setup an LLM provider

Get your Gaianet node running ([Docs](https://docs.gaianet.ai/node-guide/quick-start)) or install Ollama ([Docs](https://ollama.com/)) provider locally. 
The latter is recommended if you're looking to run the pipeline on consumer hardware.

### 9. Load an LLM embeddings model

Load the LLM embeddings model of your preference into the LLM provider you chose in the previous step:
- You can find info on how to customize a Gaianet node [here](https://docs.gaianet.ai/node-guide/customize)
- If you chose Ollama, follow these instructions to import the LLM embeddings model:
  - Make sure the Ollama service is up and running
  - Go to the folder where the embeddings model is located. For this example, the llm model file is `nomic-embed-text-v1.5.f16.gguf` ([Source](https://huggingface.co/gaianet/Nomic-embed-text-v1.5-Embedding-GGUF/tree/main?show_file_info=nomic-embed-text-v1.5.f16.gguf))
  - Create a file with name `Modelfile` and paste the following (replace `<path/to/model>` with your local directory):

```docker 
FROM <path/to/model>/nomic-embed-text-v1.5.f16.gguf
```
  - Import the model by running the following command on a terminal:
```bash [terminal]
ollama create Nomic-embed-text-v1.5
```
  - Make sure the model setting by running the command:
```bash [terminal]
ollama show Nomic-embed-text-v1.5
```

## Pipeline CLI

Now you're ready to use the `rag-api-pipeline` CLI commands to execute different tasks of the RAG pipeline, from extracting data from an API source to generating vector embeddings 
and a database snapshot. If you need more details about the parameters available on each command you can execute:

```bash [Terminal]
poetry run rag-api-pipeline <command> --help
```

### CLI available commands

Below you can find the default instructions available and an in-depth review of both the functionality and available arguments that each command offers:

```bash [Terminal]
# run the entire pipeline
poetry run rag-api-pipeline run-all API_MANIFEST_FILE ----openapi-spec-file <openapi-spec-yaml-file> [--full-refresh] [--llm-provider openapi|ollama]
# or run using an already normalized dataset
poetry run rag-api-pipeline from-normalized API_MANIFEST_FILE --normalized-data-file <jsonl-file> [--llm-provider openapi|ollama]
# or run using an already chunked dataset
poetry run rag-api-pipeline from-chunked API_MANIFEST_FILE --chunked-data-file <jsonl-file> [--llm-provider openapi|ollama]
```

- **run-all**: executes the entire RAG data pipeline including API endpoint data streams, data normalization, data chunking, vector embeddings and 
database snapshot generation. You can specify the following arguments to the command:
  * `API_MANIFEST_FILE`: API pipeline manifest file (mandatory)
  * `--llm-provider [ollama|openai]`: backend embeddings model provider. default: openai-like backend (e.g. gaia rag-api-server)
  * `--api-key`: API Auth key. If not specified, it will try to get it from `config/secrets/api_key`
  * `--openapi-spec-file`: API OpenAPI YAML spec file. default to `config/openapi.yaml`
  * `--source-manifest-file`: Airbyte API Connector YAML manifest. If specified, it will omit the API Connector manifest generation step.
  * `--full-refresh`: clean up cache and extract API data from scratch.
  * `--normalized-only`: run pipeline until the data normalization stage.
  * `--chunked-only`: run pipeline until the data chunking stage.

- **from-normalized**: executes the RAG data pipeline using an already normalized JSONL dataset. You can specify the following arguments to the command:
  * `API_MANIFEST_FILE`: API pipeline manifest file (mandatory)
  * `--llm-provider [ollama|openai]`: backend embeddings model provider. default: openai-like backend (e.g. gaia rag-api-server)
  * `--normalized-data-file`: path to the normalized dataset in JSONL format (mandatory). Check the [Architecture](docs/pages/architecture.mdx) section for details on the 
  required data schema.

- **from chunked**: executes the RAG data pipeline using an already chunked dataset in JSONL format. You can specify the following arguments to the command:
  * `API_MANIFEST_FILE`: API pipeline manifest file (mandatory)
  * `--llm-provider [ollama|openai]`: backend embeddings model provider. default: openai-like backend (e.g. gaia rag-api-server)
  * `--chunked-data-file`: path to the chunked dataset in JSONL format (mandatory). Check the [Architecture](docs/pages/architecture.mdx) section for details on the 
  required data schema.

## CLI Output

Cached API stream data and results produced from running any of the CLI commands are stored in `<OUTPUT_FOLDER>/<api_name>`. The following files and folders 
are created by the tool within this `baseDir` folder:

- `{baseDir}/{api_name}_source_generated.yaml`: generated Airbyte Stream connector manifest.
- `{baseDir}/cache/{api_name}/*`: extracted API data is cached into a local DuckDB. Database files are stored in this directory. If the `--full-refresh` argument
is specified to the `run-all` command, the cache will be cleared and API data will be extracted from scratch.
- `{baseDir}/{api_name}_stream_{x}_preprocessed.jsonl`: data streams from each API endpoint is preprocessed and stored in JSONL format
- `{baseDir}/{api_name}_normalized.jsonl`: preprocessed data streams from each API endpoint are joined together and stored in JSONL format
- `{baseDir}/{api_name}_chunked.jsonl`: normalized data that goes through the data chunking stage is then stored in JSONL format
- `{baseDir}/{api_name}_collection-xxxxxxxxxxxxxxxx-yyyy-mm-dd-hh-mm-ss.snapshot`: vector embeddings snapshot file that was exported from Qdrant DB
- `{baseDir}/{api_name}_collection-xxxxxxxxxxxxxxxx-yyyy-mm-dd-hh-mm-ss.snapshot.tar.gz`: compressed knowledge base that contains the vector embeddings snapshot

## Environment variables

The following environment variables can be adjusted in `config/.env` based on user needs:

- Pipeline config parameters:
  - `API_DATA_ENCODING` (="utf-8"): default data encoding used by the REST API
  - `OUTPUT_FOLDER` (="./output"): output folder where cached data streams, intermediary stage results and generated knowledge base snapshot are stored
- LLM provider settings:
  - `LLM_API_BASE_URL` (="http://localhost:8080/v1"): LLM provider base URL (default to a local openai-based provider such as gaia node)
  - `LLM_API_KEY` (="empty-api-key"): API key to authenticate requests to the LLM provider
  - `LLM_EMBEDDINGS_MODEL` (="Nomic-embed-text-v1.5"): name of the embeddings model to be consumed through the LLM provider
  - `LLM_EMBEDDINGS_VECTOR_SIZE` (=768): embeddings vector size
  - `LLM_PROVIDER` (="openai"): LLM provider backend to use. It can be either `openai` or `ollama` (gaianet offers an openai compatible API)
- Qdrant DB settings:
  - `QDRANTDB_URL` (="http://localhost:6333"): Qdrant DB base URL
  - `QDRANTDB_TIMEOUT` (=60): timeout for requests made to the Qdrant DB
  - `QDRANTDB_DISTANCE_FN` (="COSINE"): score function to use during vector similarity search. Avaiable functions: ['COSINE', 'EUCLID', 'DOT', 'MANHATTAN']
- Pathway-related variables:
  - `AUTOCOMMIT_DURATION_MS` (=1000): the maximum time between two commits. Every autocommit_duration_ms milliseconds, the updates received by the connector are 
  committed automatically and pushed into Pathway's dataflow. More info can be found [here](https://pathway.com/developers/user-guide/connect/connectors/custom-python-connectors#connector-method-reference)
  - `FixedDelayRetryStrategy` ([docs](https://pathway.com/developers/api-docs/udfs#pathway.udfs.FixedDelayRetryStrategy)) config parameters:
    - `PATHWAY_RETRY_MAX_ATTEMPTS` (=10): max retries to be performed if a UDF async execution fails
    - `PATHWAY_RETRY_DELAY_MS` (=1000): delay in milliseconds to wait for the next execution attempt
  - *UDF async execution*: set the maximum No of concurrent operations per batch during udf async execution. Zero means no specific limits. Be careful when settings
  this parameters for the embeddings stage as it could break the LLM provider with too many concurrent requests
    - `CHUNKING_BATCH_CAPACITY` (=0): max No. of concurrent operation during data chunking operations
    - `EMBEDDINGS_BATCH_CAPACITY` (=15): max No. of concurrent operation during vector embeddings operations


## Using Docker compose for Local development or in Production

TBD

- Start with building your containers: `docker compose -f local.yml build`.

- Build production containers with `docker compose -f prod.yml build`

- To run your application invoke:
    1. `docker compose -f prod.yml rm -svf`
    2. `docker compose -f prod.yml up`

## Troubleshooting

### Workaround in case of missing one of the following dependencies:

- If trying to install `pillow-heif` missinng module:
  - Add the following flags `export CFLAGS="-Wno-nullability-completeness"`
- Libraries required for having libmagic working:
  - MacOS:
    - `brew install libmagic`
  - `pip install python-magic-bin`

## Documentation

We use [Vocs](https://vocs.dev/) framework for generating the Documentation site. Run `pnpm run dev` if you want to work on some updates. Execute the following 
commands if you're looking to build and deploy the updated documentation on Github pages:

```bash [Terminal]
pnpm run build
pnpm run deploy
```

## Demo

Presentation slides can be found [here](https://hackmd.io/@santteegt/ByoykY4nC#/)

## License

[MIT](LICENSE)

## Authors 

🛠️ Built 🛠️ with ❤️ by [RaidGuild](https://www.raidguild.org/)