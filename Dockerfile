FROM python:3.11

ENV PYTHONUNBUFFERED=1

ARG BUILD_ENVIRONMENT=dev

WORKDIR /pipeline

COPY . .

RUN pip install poetry
RUN poetry install


# TODO: fix entrypoint
CMD ["python", "run.py" "config/mapping.yaml"]

