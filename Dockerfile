FROM python:3.11

ENV PYTHONUNBUFFERED=1

ARG BUILD_ENVIRONMENT=dev
ARG BOARDROOM_API_KEY=a9e2a08afc04b15bd17e20f05373b9e5
ARG OPEN_API_KEY=

WORKDIR /pipeline

COPY . .

RUN pip install poetry
RUN poetry install

CMD ["poetry", "run", "api-pipeline", "config/mappings.yaml"]
