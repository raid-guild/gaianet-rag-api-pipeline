"""
REST Microservice implementing a simple, contextless Chatbot.

The program responds to each query by directly forwarding it to the OpenAI API.

Please check the README.md in this directory for how-to-run instructions.
"""

import dotenv
import logging
import json
import os

import pathway as pw
from pathway.xpacks.llm.llms import OpenAIChat, prompt_chat_single_qa
from litellm import completion

# To use advanced features with Pathway Scale, get your free license key from
# https://pathway.com/features and paste it below.
# To use Pathway Community, comment out the line below.
# pw.set_license_key("demo-license-key-with-telemetry")

dotenv.load_dotenv()

logger = logging.getLogger(__name__)


class QueryInputSchema(pw.Schema):
    query: str
    user: str


def run(
    *,
    api_key: str = os.environ.get("OPENAI_API_KEY", ""),
    host: str = os.environ.get("PATHWAY_REST_CONNECTOR_HOST", "0.0.0.0"),
    port: int = int(os.environ.get("PATHWAY_REST_CONNECTOR_PORT", "8180")),
    # model_locator: str = "gpt-3.5-turbo",
    # model_locator: str = "Meta-Llama-3-8B-Instruct-Q5_K_M",
    model_locator: str = "Llama-3-8B-Instruct",
    max_tokens: int = 60,
    temperature: float = 0.8,
    **kwargs,
):
    # table = pw.io.http.read(
    #     "https://api.boardroom.info/v1/protocols/compound/proposals?adapter=onchain&indexedAt=asc&key=a9e2a08afc04b15bd17e20f05373b9e5&limit=1",
    #     method="GET",
    #     format="raw"
    # )

    # print(table.schema)

    # pw.debug.compute_and_print(table)

    query, response_writer = pw.io.http.rest_connector(
        host=host,
        port=port,
        schema=QueryInputSchema,
        autocommit_duration_ms=50,
        delete_completed_queries=True,
    )
    # print("2")
    # print(query)

    # model = OpenAIChat(
    #     model=model_locator,
    #     api_key=api_key,
    #     temperature=temperature,
    #     max_tokens=max_tokens,
    #     retry_strategy=pw.asynchronous.FixedDelayRetryStrategy(),
    #     cache_strategy=pw.asynchronous.DefaultCache(),
    # )

    # responses = query.select(
    #     query_id=pw.this.id,
    #     result=model(prompt_chat_single_qa(pw.this.query)),
    # )

    @pw.udf(
        # cache_strategy=pw.asynchronous.DefaultCache(),
        # cache_strategy=pw.udfs.DefaultCache(),
        # executor=pw.udfs.async_executor(
        #     # capacity=5,
        #     retry_strategy=pw.asynchronous.FixedDelayRetryStrategy()
        # ),
        return_type=str
    )
    def llm_call(messages: pw.Json) -> str:
        logger.info(pw.Json.dumps(messages))
        # event = {
        #     "_type": "openai_chat_request",
        #     # "kwargs": copy.deepcopy(kwargs),
        #     # "id": msg_id,
        #     "messages": _prep_message_log(messages_decoded, verbose),
        # }
        # logger.info(json.dumps(event))

        messages_decoded = messages.as_list()

        result = completion(
            model=model_locator,
            api_key=api_key,
            temperature=temperature,
            max_tokens=max_tokens,
            # retry_strategy=pw.asynchronous.FixedDelayRetryStrategy(),
            # cache_strategy=pw.asynchronous.DefaultCache(),
            # messages=[{ "content": query, "role": "user"}],
            # messages=prompt_chat_single_qa(pw.this.query),
            messages=messages_decoded,
            # api_base="http://127.0.0.1:8080/v1",
            api_base="https://llama3.gaianet.network/v1",
            custom_llm_provider="openai" # litellm will use the openai.ChatCompletion to make the request
        )

        response = result.choices[0]["message"]["content"]

        # event = {
        #     "_type": "openai_chat_response",
        #     "response": response[: min(50, len(response))],
        #     # "id": msg_id,
        # }
        # logger.info(json.dumps(event))

        return response

    @pw.udf
    def prompt_chat_user_qa(question: str) -> pw.Json:
        return pw.Json([dict(role="user", content=question)])
        # return pw.Json([dict(
        #     messages=[dict(role="user", content=question)],
        #     model="Llama-3-8B-Instruct",
        #     # stream=True,
        #     # stream_options=dict(include_usage=true),
        #     user="e0399e78-faed-4689-a720-d6e1e4a649b9" # TODO
        # )])


    rs = query.select(
        query_id=pw.this.id,
        # result=pw.apply(lambda x: llm_call(prompt_chat_single_qa(x)), pw.this.query)
        # result=llm_call(prompt_chat_single_qa(pw.this.query))
        result=llm_call(prompt_chat_user_qa(pw.this.query))
    )

    print("2.5")
    # print(result)
    print(rs.schema)
    # pw.debug.compute_and_print(rs)

    # responses = query.select(
    #     query_id=pw.this.id,
    #     result=completion(
    #         model=model_locator,
    #         api_key=api_key,
    #         temperature=temperature,
    #         max_tokens=max_tokens,
    #         # retry_strategy=pw.asynchronous.FixedDelayRetryStrategy(),
    #         # cache_strategy=pw.asynchronous.DefaultCache(),
    #         messages=[{ "content": "Hello, how are you?","role": "user"}],
    #         # messages=prompt_chat_single_qa(pw.this.query),
    #         api_base="http://127.0.0.1:8080/v1",
    #         custom_llm_provider="openai" # litellm will use the openai.ChatCompletion to make the request
    #     ),
    # )
    # print("3", responses)

    # response_writer(responses)

    response_writer(rs)

    pw.run()

# NOTICE: after running `python app.py` you can test it by sending a request like
# curl --data '{
#   "user": "user",
#   "query": "What is Llama3?"
# }' http://127.0.0.1:8180/
if __name__ == "__main__":
    run()
