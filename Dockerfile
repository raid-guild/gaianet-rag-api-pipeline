FROM python:3.11

ENV PYTHONUNBUFFERED=1

ARG BUILD_ENVIRONMENT=dev

WORKDIR /gaianet_rag_api_pipeline

COPY requirements-common.txt requirements-common.txt
COPY requirements-${BUILD_ENVIRONMENT}.txt requirements-${BUILD_ENVIRONMENT}.txt
RUN pip install --no-cache-dir --upgrade -r /gaianet_rag_api_pipeline/requirements-${BUILD_ENVIRONMENT}.txt

COPY . .
CMD ["python", "run.py"]