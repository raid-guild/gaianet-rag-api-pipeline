# GaiaNet RAG API Pipeline

## System Requirements

- Python 3.11.x

## Dependencies

- airbyte==0.16.4
- pathway[xpack-llm]
- pathway[xpack-llm-docs]

Workaround in case of missing dependencies:

- if trying to install pillow-heif missingn module
    - export CFLAGS="-Wno-nullability-completeness"
- libmagic -> Required for having libmagic working
    - MacOS:
        - brew install libmagic
    - pip install python-magic-bin

## Pipeline execution

```
poetry run api-pipeline <BOARDROOM_API_KEY> --open-api-file config/openapi.yaml
```

## Local development

Start with building your containers: `docker compose -f local.yml build`.

You are ready to start developing your application!
Define your custom logic in `gaianet_rag_api_pipeline/pipeline.py`. It already contains a sample code which sums all the input values.

You can test it in the following modes:

- [debug (batch mode)] run your Pathway app code with pytest with `docker compose -f local.yml run --rm pathway_app pytest`
- [streaming] run your Pathway app `docker compose -f local.yml up`. Modify `InfiniteStream` in `gaianet_rag_api_pipeline/input.py` to feed it with different data. The results are streamed to the `output.csv` file (you can change this in `gaianet_rag_api_pipeline/output.py`)

## Production environment

Production environment streams data from `redpanda`.
Build production containers with `docker compose -f prod.yml build`

To run your application invoke:
1. `docker compose -f prod.yml rm -svf` to clean the state so that `redpanda` can start without issues
2. `docker compose -f prod.yml up`

For test, you can push messages to redpanda by running
`docker compose -f prod.yml exec redpanda rpk topic create gaianet_rag_api_pipeline` to make sure the topic is created
and then `docker compose -f prod.yml exec redpanda rpk topic produce gaianet_rag_api_pipeline`

and typing in the messages, e.g:
`{"value":10}`


## Configuration

Supply configuration with environment variables.

For ease of development, you can also use dotenv file in `config/.env` to specify configuration.
Note that environment variables will take precedence over any configuration specified in `config/.env` file.
