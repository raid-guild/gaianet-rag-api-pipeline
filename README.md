# GaiaNet x RAG API Pipeline

`rag-api-pipeline` is a Python-based data pipeline tool that allows you to easily generate a vector knowledge base from any REST API data source. The resulting database snapshot can be then plugged-in into a Gaia node's LLM model with a prompt and provide contextual responses to user queries using RAG (Retrieval Augmented Generation).

The following sections help you to quickly setup and execute the pipeline on your REST API. If you're looking more in-depth information about how to use this tool, tech stack and/or how it works under the hood, check the [official documentation](https://raid-guild.github.io/gaianet-rag-api-pipeline) site.

## System Requirements

- Python 3.11.x
- Poetry ([Docs](https://python-poetry.org/docs/))
  - (Optional): a Python virtual environment manager of your preference (e.g. conda, venv)
- Qdrant vector database ([Docs](https://qdrant.tech/documentation/))
  - (Optional): Docker to spin up a local container
- LLM model provider ([spin up your own Gaia node](docs/pages/cli/node-deployment.mdx) or pick one from the [GaiaNet public network](https://www.gaianet.ai/chat))
  - An Embeddings model (e.g. [Nomic-embed-text-v1.5](https://huggingface.co/gaianet/Nomic-embed-text-v1.5-Embedding-GGUF/tree/main?show_file_info=nomic-embed-text-v1.5.f16.gguf))

## Setup Instructions

### 1. Clone this repository

Git clone or download this repository to your local machine.

```bash
git clone https://github.com/raid-guild/gaianet-rag-api-pipeline.git
```

### 2. Install the Pipeline CLI 

It is recommended to activate your [own virtual environment](https://python-poetry.org/docs/basic-usage/#using-your-virtual-environment). 
Then, navigate to the directory where this repository was cloned/download and execute the following command to install the `rag-api-pipeline` CLI:

```bash
cd gaianet-rag-api-pipeline
pip install -e .
```

### 3. Setup the Pipeline Configuration

Run the following command to start the pipeline setup wizard. You can use the default configuration settings or customize it for your specific needs:

```bash
rag-api-pipeline setup
```

Check the [Setup CLI Reference](docs/pages/cli/setup.mdx) page for more details.

## RAG API pipeline Demo

A quick demo that extracts data from the Boardroom API can be executed by running the following command:

```bash [Terminal]
rag-api-pipeline run all config/boardroom_api_pipeline.yaml config/boardroom_openapi.yaml
```

You are required two specify two main arguments to the pipeline:
- The path to the OpenAPI specification file (e.g. `config/boardroom_openapi.yaml`): the OpenAPI spec for the REST API data source 
you're looking to extract data from.
- The path to the API pipeline manifest file (e.g. `config/boardroom_api_pipeline.yaml`): a YAML file that defines API endpoints you're 
looking to extract data from, among other parameters (more details in the next section).

Once the pipeline execution is completed, you'll find the vector database snapshot and extracted/processed datasets under the `output/molochdao_boardroom_api` folder.

## Define your own API Pipeline manifest

Now it's time to define the pipeline manifest for the REST API you're looking to extract data from. Make sure you get the OpenAPI specification 
for the API you're targeting. Check the 
[Defining an API Pipeline Manifest](docs/pages/manifest-definition/overview.mdx) page for details on how to get the OpenAPI spec and define an API pipeline manifest, 
or take a look at the in-depth review of the sample manifests available in the [API Examples](docs/pages/apis) folder.

## Using the Pipeline CLI

Once you have both the API pipeline manifest and OpenAPI spec files, you're ready to start using the `rag-api-pipeline run` command to execute different tasks of the RAG pipeline, 
from extracting data from an API source to generating vector embeddings and a database snapshot. If you need more details about the parameters available 
on each task you can execute:

```bash [Terminal]
rag-api-pipeline run <command> --help
```

### Available sub-commands

Below is the list of available commands. Check the [CLI Reference](docs/pages/cli/reference.mdx#run) documentation for more details:

```bash [Terminal]
# run the entire pipeline
rag-api-pipeline run all <API_MANIFEST_FILE> <OPENAPI_SPEC_FILE> [--full-refresh]
# or run using an already normalized dataset
rag-api-pipeline run from-normalized <API_MANIFEST_FILE> --normalized-data-file <jsonl-file>
# or run using an already chunked dataset
rag-api-pipeline run from-chunked <API_MANIFEST_FILE> --chunked-data-file <jsonl-file>
```

## Troubleshooting

### Workaround in case of missing one of the following dependencies

- If trying to install `pillow-heif` missinng module:
  - Add the following flags `export CFLAGS="-Wno-nullability-completeness"`
- Libraries required for having libmagic working:
  - MacOS:
    - `brew install libmagic`
  - `pip install python-magic-bin`

## Documentation

This project uses [Vocs](https://vocs.dev/) framework for generating the Documentation site. If you want to run it locally and contribute, you should run the following commands:

```bash
pnpm install
pnpm run dev
```

To reflect any updates to [Github pages](https://raid-guild.github.io/gaianet-rag-api-pipeline), you need to build and deploy the updated documentation by executing the following commands:

```bash
pnpm run build
pnpm run deploy
```

## License

[MIT](LICENSE)

## Authors

🛠️ Built 🛠️ with ❤️ by [RaidGuild](https://www.raidguild.org/)
