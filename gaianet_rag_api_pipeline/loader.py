from gaianet_rag_api_pipeline.config import logger
from gaianet_rag_api_pipeline.schema import PaginationSchemas
from gaianet_rag_api_pipeline.utils import resolve_refs

from openapi_spec_validator import validate_spec
from openapi_spec_validator.readers import read_from_filename
import pathway as pw
import pathlib
from typing import Any, Tuple
import yaml


def validate_base_definitions(mappings: dict):
    defIds = list(mappings.get("definitions", {}).keys())
    for refId in ["paginator", "requester_base", "retriever_base", "selector"]:
        if refId not in defIds:
            error_msg = f"{refId} is missing in mapping definitions"
            logger.error(error_msg)
            raise Exception(error_msg)


def load_openapi_spec(openapi_spec_file: pathlib.Path) -> dict:
    (openapi_spec, _) = read_from_filename(openapi_spec_file)
    # validate openapi spec
    try:
        validate_spec(openapi_spec)
    except Exception as error:
        logger.error(f"Spec not valid. A {type(error).__name__} error was raised", exc_info=True)
        raise error
    
    return openapi_spec


def get_endpoints(mappings: dict):
    endpoints = mappings.get("endpoints", {})
    return {endpoint: resolve_refs(details, mappings) for endpoint, details in endpoints.items()}


def get_pagination_schema(api_definitions: dict) -> PaginationSchemas:
    pagination_strategy = api_definitions.\
        get("paginator", {}).\
        get("pagination_strategy", {}).\
        get("type", None)

    if pagination_strategy not in [schema.name for schema in PaginationSchemas]:
        error_msg = f"Pagination strategy '{pagination_strategy}' not supported"
        logger.error(error_msg)
        raise Exception(error_msg)

    return PaginationSchemas[pagination_strategy]


def get_endpoint_response_schema(
    endpoint_spec: dict,
    request_method: str,
    content_type: str,
    response_entrypoint_field: str
) -> dict:
    response_schema = endpoint_spec.\
        get(request_method, {}).\
        get("responses", {}).get("200", {}).\
        get("content", {}).get(content_type, {}).\
        get("schema", {})

    return response_schema.\
        get("properties", {}).\
        get(response_entrypoint_field, {})


def get_response_data_fields(data_root: dict, entrypoint_type: str, openapi_spec: dict) -> dict:
    data_fields = resolve_refs(data_root, openapi_spec)
    if entrypoint_type == "array":
        # need to get properties from nested items spec
        data_fields = data_fields.\
            get("items", {})
    return data_fields.get("properties", {})


def get_endpoint_text_properties(endpoint_details: dict, data_fields: dict) -> dict:
    # should validate textSchemas exist in response schema
    # fields specified in textSchemas will be extracted and joined together to be preprocessed
    # other response data fields will be included as json metadata
    text_schemas = endpoint_details.\
        get("textSchema", {}).\
        get("properties", {})
    
    fields_list = list(data_fields.keys())

    # validate text properties are in the endpoint openapi spec as response data fields
    text_properties = list()
    for text_schema in text_schemas:
        field = list(text_schema.keys())[0]
        props = text_schema[field]
        if field not in fields_list or props.get("type", "") != data_fields[field].get("type", ""):
            error_msg = f"endpoint field not found or mismatch in openapi spec: {field} - {props}"
            logger.error(error_msg)
            raise Exception(error_msg)
        text_properties.append(dict(field=field, **props))
    
    return text_properties


def generate_source_manifest(
    mappings: dict,
    openapi_spec: dict,
) -> Tuple[dict, dict]:
    stream_refs = []
    stream_names = []
    stream_definitions = dict()
    endpoint_text_fields = dict()

    # get base api config
    api_config = mappings.get("api_config", {})

    # get airbyte-like manifest declarative source spec
    spec = mappings.get("spec", {})
    connection_spec = spec.get("connection_specification", {})
    spec_config_props = connection_spec.get("properties", {})
    
    # get list of config parameters coming from source definition
    source_parameters = list(spec_config_props.keys())

    # get endpoints and expand refs
    endpoints = get_endpoints(mappings)

    # Config settings
    request_method = api_config.get("request_method", "get")
    content_type = api_config.get("content_type", "application/json")
    response_entrypoint_field = api_config.get("response_entrypoint_field", "data")
    response_primary_key = api_config.get("response_primary_key", None)

    if not response_primary_key:
        raise Exception("response_primary_key missing in mappings api_config")

    openapi_endpoints = openapi_spec.get("paths", {})
    available_endpoints = list(openapi_endpoints.keys())

    for endpoint, details in endpoints.items():
        if not details or not details.get("id", None):
            error_msg = f"Parse error in mapping endpoint: {endpoint} - {details}"
            logger.error(error_msg, exc_info=True)
            raise Exception(error_msg)
        
        logger.debug(f"endpoint: {endpoint}")

        # make sure endpoint is in openapi spec
        if endpoint not in available_endpoints:
            error_msg = f"{endpoint} NOT found!"
            logger.errort(error_msg, exc_info=True)
            raise Exception(error_msg)
        #####

        # get endpoint spec
        endpoint_spec = openapi_endpoints.get(endpoint, {})

        # validate mandatory params
        endpoint_params = endpoint_spec.get(request_method, {}).get("parameters", {})
        required_params = [param for param in endpoint_params if param.get("required", False)]
        logger.debug(f"\t - required params: {[p.get('name', '') for p in required_params]}")
        for p in required_params:
            if p.get("name", None) not in source_parameters:
                error_msg = f"{p} not found in spec properties"
                logger.error(error_msg, exc_info=True)
                raise Exception(error_msg)
        #####

        # update endpoint path with url params
        path_params = [param.get("name", "") for param in required_params if param.get("in", "") == "path"]
        logger.debug(f"\t - path params: {path_params}")
        endpoint_path = f"{endpoint}"
        for param in path_params:
            endpoint_path = endpoint_path.replace(f"{param}", f"{{ config['{param}'] }}")
        #####

        # add query params if passed as source_parameters
        query_params = [param.get("name", "") for param in endpoint_params if param.get("in", "") == "query"]
        match_query_params = [param for param in query_params if param in source_parameters]
        logger.debug(f"\t - available query params: {query_params}")
        logger.debug(f"\t - found query params: {match_query_params}")

        # building endpoint request parameters
        request_parameters = dict()
        if len(match_query_params):
            request_parameters = { param: "{{ <var> }}".replace("<var>", f"config['{param}']") for param in match_query_params }
        #####

        # get response schema from endpoint spec
        data_root = get_endpoint_response_schema(
            endpoint_spec=endpoint_spec,
            request_method=request_method,
            content_type=content_type,
            response_entrypoint_field=response_entrypoint_field
        )

        # get entrypoint type
        entrypoint_type = data_root.get("type", "")

        # get response data fields
        data_fields = get_response_data_fields(data_root, entrypoint_type, openapi_spec)
        logger.debug(f"endpoint spec data fields: {data_fields}")

        # get endpoint text properties
        text_properties = get_endpoint_text_properties(
            endpoint_details=details,
            data_fields=data_fields
        )
        logger.debug(f"endpoint text fields: {text_properties}")

        # build endpoints ids
        stream_id = details.get("id", "")
        stream_refId = f"{stream_id}_stream"
        
        # update endpoint pre-process text fields
        endpoint_text_fields[endpoint] = dict(
            stream_id=stream_id,
            entrypoint_type=entrypoint_type,
            text_properties=text_properties,
        )

        # setup pagination
        paginator = {
            "type": "NoPagination"
        }
        needs_pagination = entrypoint_type == "array"
        if needs_pagination:
            paginator = {
                "$ref": "#/definitions/paginator"
            }
        logger.debug(f"response schema: needs pagination? {needs_pagination} - {paginator}")
        #####

        # setup requester
        requester = {
            "$ref": "#/definitions/requester_base"
        }
        has_request_params = len(request_parameters.keys()) > 0
        if has_request_params:
            requester["request_parameters"] = request_parameters
        logger.debug(f"response schema: has request parameters? {has_request_params} - {request_parameters}")
        
        # build endpoint stream definition
        stream_definitions[stream_refId] = {
            "type": "DeclarativeStream",
            "retriever": {
                "$ref": "#/definitions/retriever_base",
                "paginator": paginator,
                "requester": requester,
            },
            "schema_loader": {
                "type": "InlineSchemaLoader",
                "schema": {
                    "$ref": details.get("responseSchema", ""),
                },
            },
            "$parameters": {
                "name": stream_id,
                "primary_key": response_primary_key,
                "path": f'"{endpoint_path}"',
            },
        }
            
        stream_refs.append(f"#/definitions/{stream_refId}")
        stream_names.append(stream_id)

        stream_yaml_spec = yaml.dump(stream_definitions[stream_refId])
        logger.debug(f"stream spec:\n {stream_yaml_spec}\n\n")

    # build source manifest   
    definitions = {
        **mappings["definitions"],
        **stream_definitions,
    }
    check_streams = dict(
        type="CheckStream",
        stream_names=stream_names,
    )

    source_manifest = dict(
        version="3.0.0",
        spec=mappings["spec"],
        definitions=definitions,
        streams=stream_refs,
        check=check_streams,
        schemas=mappings["schemas"],
    )

    return (source_manifest, endpoint_text_fields)


def api_loader(
    manifest_file: pathlib.Path,
    openapi_spec_file: pathlib.Path,
    output_folder: str,
) -> Tuple[Tuple[str, PaginationSchemas, dict], Tuple[dict, str], dict[str, Any]]:
    mappings = dict()
    with open(manifest_file, "r") as f:
        mappings = yaml.safe_load(f)

    # TODO: validate name only contains alphanumeric characters and underscores
    api_name = mappings.get("api_name", None)
    if not api_name:
        raise Exception("api_name not found in mappings")

    api_parameters = mappings.get("api_parameters", None)
    logger.debug(f"api parameters - {api_parameters}")

    # validate "base" definitions are in mappings
    validate_base_definitions(mappings=mappings)

    # load openapi spec
    openapi_spec = load_openapi_spec(openapi_spec_file)

    # generate source manifest
    (source_manifest, endpoint_text_fields) = generate_source_manifest(
        mappings=mappings,
        openapi_spec=openapi_spec,
    )

    # get pagination strategy
    definitions = mappings.get("definitions", {})
    pagination_schema = get_pagination_schema(api_definitions=definitions)
    logger.debug(f"pagination schema: {pagination_schema.name}")

    # store generated manifest
    output_file = f"{output_folder}/{api_name}_source_generated.yaml"
    with open(output_file, "w") as out_file:
        yaml.dump(source_manifest, out_file)
        logger.debug(f"source manifest written to {output_file}")

    # get chunking params
    chunking_params = mappings.get("chunking_params", {})

    return (
        (api_name, pagination_schema, api_parameters),
        (source_manifest, endpoint_text_fields),
        chunking_params,
    )


def api_read(
    source_manifest_file: pathlib.Path,
    manifest_file: pathlib.Path,
    openapi_spec_file: pathlib.Path
) -> Tuple[Tuple[str, PaginationSchemas, dict], Tuple[dict, str], dict[str, Any]]:
    mappings = dict()
    with open(manifest_file, "r") as f:
        mappings = yaml.safe_load(f)

    # TODO: validate name only contains alphanumeric characters and underscores
    api_name = mappings.get("api_name", None)
    if not api_name:
        raise Exception("api_name not found in mappings")

    # get base api config
    api_config = mappings.get("api_config", {})

    api_parameters = mappings.get("api_parameters", None)
    logger.debug(f"api parameters - {api_parameters}")

    # read source manifest
    source_manifest = dict()
    with open(source_manifest_file, "r") as f:
        source_manifest = yaml.safe_load(f)

    # validate "base" definitions are in mappings
    validate_base_definitions(mappings=mappings)

    # load openapi spec
    openapi_spec = load_openapi_spec(openapi_spec_file)

    # get endpoints and expand refs
    endpoints = get_endpoints(mappings)

    # get pagination strategy
    definitions = source_manifest.get("definitions", {})
    pagination_schema = get_pagination_schema(api_definitions=definitions)
    logger.debug(f"pagination schema: {pagination_schema.name}")

    # Config settings
    request_method = api_config.get("request_method", "get")
    content_type = api_config.get("content_type", "application/json")
    response_entrypoint_field = api_config.get("response_entrypoint_field", "data")

    openapi_endpoints = openapi_spec.get("paths", {})
    endpoint_text_fields = dict()
    for endpoint, details in endpoints.items():
        # get endpoint spec
        endpoint_spec = openapi_endpoints.get(endpoint, {})
        # get response schema from endpoint spec
        data_root = get_endpoint_response_schema(
            endpoint_spec=endpoint_spec,
            request_method=request_method,
            content_type=content_type,
            response_entrypoint_field=response_entrypoint_field
        )
        # get entrypoint type
        entrypoint_type = data_root.get("type", "")

        # get response data fields
        data_fields = get_response_data_fields(data_root, entrypoint_type, openapi_spec)
        logger.debug(f"endpoint spec data fields: {data_fields}")

        # get endpoint text properties
        text_properties = get_endpoint_text_properties(
            endpoint_details=details,
            data_fields=data_fields
        )
        logger.debug(f"endpoint text fields: {text_properties}")

        # build endpoints ids
        stream_id = details.get("id", "")
        
        # update endpoint pre-process text fields
        endpoint_text_fields[endpoint] = dict(
            stream_id=stream_id,
            entrypoint_type=entrypoint_type,
            text_properties=text_properties,
        )

    # get chunking params
    chunking_params = mappings.get("chunking_params", {})

    return (
        (api_name, pagination_schema, api_parameters),
        (source_manifest, endpoint_text_fields),
        chunking_params,
    )
    

def get_dict_field(manifest_file: pathlib.Path, field_id: str) -> dict:
    mappings = dict()
    with open(manifest_file, "r") as f:
        mappings = yaml.safe_load(f)

    return mappings.get(field_id, {})


def get_str_field(manifest_file: pathlib.Path, field_id: str) -> str:
    mappings = dict()
    with open(manifest_file, "r") as f:
        mappings = yaml.safe_load(f)

    return mappings.get(field_id, "")
