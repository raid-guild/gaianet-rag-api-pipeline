FROM python:3.11

# ENV PYTHONUNBUFFERED=1

# ARG BUILD_ENVIRONMENT=dev

WORKDIR /pipeline

COPY . .

RUN pip install poetry
RUN poetry install

CMD ["poetry", "run", "api-pipeline", "config/api_pipeline.yaml"]
