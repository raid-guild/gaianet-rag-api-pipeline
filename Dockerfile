FROM python:3.11

WORKDIR api_pipeline

COPY . /api_pipeline

RUN pip install poetry
RUN pip install -e .

ENTRYPOINT ["rag-api-pipeline", "run"]
