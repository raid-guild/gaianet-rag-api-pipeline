from gaianet_rag_api_pipeline.config import logger
from gaianet_rag_api_pipeline.utils import resolve_refs

from openapi_spec_validator import validate_spec
from openapi_spec_validator.readers import read_from_filename
import pathway as pw
import pathlib
from typing import Any, Tuple
import yaml

# Base definitions that MUST be in api pipeline manifest
BASE_DEFINITIONS = [
    "selector", # selector with field_path defined to extract multiple records from API response
    "selector_single", # selector with empty field_path. Useful for single record API responses
    "paginator", # API pagination strategy
    "requester_base", # API Requester definition
    "retriever_base", # Base API retriever with `selector`
    "retriever_single_base", # Base API retriever with `selector_single`
]


def validate_base_definitions(mappings: dict):
    """
    Validates that all required base definitions are present in the provided mappings.

    This function checks if all identifiers listed in `BASE_DEFINITIONS` are included in the `definitions` 
    section of the `mappings` dictionary. If any of the required base definitions are missing, it logs an 
    error and raises an exception.

    Args:
        mappings (dict): A dictionary containing the mappings which include the `definitions` section.

    Raises:
        Exception: If any required base definition is missing in the `definitions` section.
    """
    defIds = list(mappings.get("definitions", {}).keys())
    for refId in BASE_DEFINITIONS:
        if refId not in defIds:
            error_msg = f"{refId} is missing in mapping definitions"
            logger.error(error_msg)
            raise Exception(error_msg)


def load_openapi_spec(openapi_spec_file: pathlib.Path) -> dict:
    """
    Loads and validates an OpenAPI specification from a file.

    This function reads an OpenAPI specification from the specified file and validates its structure. 
    It checks the version of the OpenAPI specification and skips validation if the version is greater than 
    or equal to 3.1.0 due to current library limitations. If the specification is invalid, it logs an error 
    and raises an exception.

    Args:
        openapi_spec_file (pathlib.Path): The path to the OpenAPI specification file.

    Returns:
        dict: The OpenAPI specification as a dictionary.

    Raises:
        Exception: If there is an error during the validation of the OpenAPI specification.
    """
    (openapi_spec, _) = read_from_filename(openapi_spec_file)
    # validate openapi spec
    try:
        # TODO: to support openapi >= 3.1.0 a library upgrade is needed.
        # However there's a dependency conflict with `jsonschema`
        spec_version = openapi_spec.get("openapi")
        (major, minor, _) = spec_version.split(".")
        if int(major) == 3 and int(minor) > 0:
            logger.warn("Loader cannot validate openapi >= 3.1.0. Bypassing validation...")
        else:
            validate_spec(openapi_spec)
    except Exception as error:
        logger.error(f"Spec not valid. A {type(error).__name__} error was raised", exc_info=True)
        raise error
    
    return openapi_spec


def get_endpoints(mappings: dict):
    """
    Extracts and resolves endpoints from the mappings.

    This function retrieves the endpoints section from the `mappings` dictionary and resolves references 
    in the endpoint details using the provided mappings.

    Args:
        mappings (dict): A dictionary containing the mappings with an `endpoints` section.

    Returns:
        dict: A dictionary of endpoints with resolved references.
    """
    endpoints = mappings.get("endpoints", {})
    return {endpoint: resolve_refs(details, mappings) for endpoint, details in endpoints.items()}


def get_endpoint_response_schema(
    openapi_endpoint_spec: dict,
    request_method: str,
    content_type: str,
    response_entrypoint_field: str
) -> dict:
    """
    Retrieves the response schema for a specific endpoint and request method.

    This function extracts the response schema from the OpenAPI endpoint specification based on the 
    request method, content type, and optional entrypoint field.

    Args:
        openapi_endpoint_spec (dict): The OpenAPI specification for the endpoint.
        request_method (str): The HTTP method for the request (e.g., "GET", "POST").
        content_type (str): The MIME type of the response content (e.g., "application/json").
        response_entrypoint_field (str): The field in the response schema to use as the entry point, if applicable.

    Returns:
        dict: The response schema for the specified endpoint and request method. If an entrypoint field is 
              specified, returns the schema for that field within the response schema.
    """
    response_schema = openapi_endpoint_spec.\
        get(request_method, {}).\
        get("responses", {}).get("200", {}).\
        get("content", {}).get(content_type, {}).\
        get("schema", {})

    # TODO: make sure this works with API endpoints that return single records
    if len(response_entrypoint_field) > 0:
        return response_schema.\
            get("properties", {}).\
            get(response_entrypoint_field, {})
    return response_schema


def get_response_data_fields(
    schema_fields_root: dict,
    entrypoint_type: str,
    openapi_spec: dict
) -> dict:
    """
    Retrieves the data fields from the response schema.

    This function resolves references in the schema fields root and extracts the data fields based on the 
    entrypoint type (array or object) from the OpenAPI specification.

    Args:
        schema_fields_root (dict): The root schema fields to resolve.
        entrypoint_type (str): The type of the entry point ("array" or "object").
        openapi_spec (dict): The OpenAPI specification used for resolving references.

    Returns:
        dict: The data fields from the response schema, which may include nested items if the entrypoint type is "array".
    """
    data_fields = resolve_refs(schema_fields_root, openapi_spec)
    if entrypoint_type == "array":
        # need to get properties from nested items spec
        data_fields = data_fields.\
            get("items", {})
    return data_fields.get("properties", {})


def get_endpoint_text_properties(endpoint_details: dict, data_fields: dict) -> dict:
    """
    Extracts text properties from the endpoint details and validates them against response data fields.

    This function identifies and validates text properties from the `textSchema` in the endpoint details. 
    It ensures that these text properties exist in the response data fields and have matching types. 

    Args:
        endpoint_details (dict): The details of the endpoint, including `textSchema`.
        data_fields (dict): The response data fields to validate against.

    Returns:
        dict: A list of text properties extracted from the endpoint details.

    Raises:
        Exception: If text properties are missing from the response data fields or type mismatches are found.
    """
    # should validate textSchemas exist in response schema
    # fields specified in textSchemas will be extracted and joined together to be preprocessed
    # other response data fields will be included as json metadata
    text_schemas = endpoint_details.\
        get("textSchema", {}).\
        get("properties", {})
    
    logger.debug(f"textSchemas - {text_schemas}")
    
    fields_list = list(data_fields.keys())

    # validate text properties are in the endpoint openapi spec as response data fields
    text_properties = list()
    for field in text_schemas.keys():
        props = text_schemas[field]
        if field not in fields_list or props.get("type", "") != data_fields[field].get("type", ""):
            error_msg = f"endpoint field not found or mismatch in openapi spec: {field} - {props} NOT in {data_fields}"
            logger.error(error_msg)
            raise Exception(error_msg)
        text_properties.append(dict(field=field, **props))
    
    return text_properties


def generate_source_manifest(
    mappings: dict,
    openapi_spec: dict,
) -> Tuple[dict, dict]:
    """
    Generates a source manifest and endpoint text fields from the provided mappings and OpenAPI specification.

    This function creates a source manifest that includes a list of stream definitions, endpoint details, 
    and other configurations required for data extraction. It also extracts text fields from the endpoints 
    based on the OpenAPI specification and mappings.

    Args:
        mappings (dict): A dictionary containing the mappings, including API configuration, specifications, 
                         and definitions.
        openapi_spec (dict): A dictionary representing the OpenAPI specification, including endpoint 
                             definitions and response schemas.

    Returns:
        Tuple[dict, dict]: A tuple containing two elements:
            - A dictionary representing the generated source manifest, which includes the definitions, 
              streams, and other configurations.
            - A dictionary with endpoint text fields, where each key is an endpoint and the value is a dictionary 
              containing information about the text properties and entrypoint type.

    Raises:
        Exception: If there is an error in parsing endpoint details, validating parameters, or constructing 
                   the source manifest.
    """
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
    response_entrypoint_field = api_config.get("response_entrypoint_field", "data") # TODO: consider entrypoint per endpoint

    # Get endpoints from openapi spec
    openapi_endpoints = openapi_spec.get("paths", {})
    available_endpoints = list(openapi_endpoints.keys())

    # go over endpoints in api manifest
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

        # get endpoint spec from openapi manifest
        openapi_endpoint_spec = openapi_endpoints.get(endpoint, {})

        # validate mandatory params
        endpoint_params = openapi_endpoint_spec.get(request_method, {}).get("parameters", {})
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

        # get response schema fields from endpoint spec
        schema_fields_root = get_endpoint_response_schema(
            openapi_endpoint_spec=openapi_endpoint_spec,
            request_method=request_method,
            content_type=content_type,
            response_entrypoint_field=response_entrypoint_field
        )
        logger.debug(f"schema_fields_root - {schema_fields_root}")

        # get entrypoint type: either array or object
        entrypoint_type = schema_fields_root.get("type", "")
        logger.debug(f"entrypoint_type - {entrypoint_type}")

        # get response data fields
        data_fields = get_response_data_fields(schema_fields_root, entrypoint_type, openapi_spec)
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
        
        # set endpoint text fields to preprocess during the chunking stage
        endpoint_text_fields[endpoint] = dict(
            stream_id=stream_id,
            entrypoint_type=entrypoint_type,
            text_properties=text_properties,
        )

        # setup pagination. NoPagination by default
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

        # setup retriever
        retriever_base = "#/definitions/retriever_base" if entrypoint_type == "array" else "#/definitions/retriever_single_base"

        # Disabled: make sure primary key is in response schema
        # primary_key = details.get("primary_key", "")
        # if primary_key not in data_fields.keys():
        #     error_msg = f"primary_key '{primary_key}' not found in response schema"
        #     logger.error(error_msg)
        #     raise Exception(error_msg)
        
        # build endpoint stream definition
        stream_definitions[stream_refId] = {
            "type": "DeclarativeStream",
            "retriever": {
                "$ref": retriever_base,
                "paginator": paginator,
                "requester": requester,
            },
            "schema_loader": {
                "type": "InlineSchemaLoader",
                "schema": {
                    "$ref": details.get("responseSchema", ""), # TODO: we should automatically inject this from openapi spec instead
                },
            },
            "$parameters": {
                "name": stream_id,
                # "primary_key": f'"{primary_key}"', # TODO: not mandatory. Might be removed to avoid user errors
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
    output_folder: str
) -> Tuple[Tuple[str, dict], Tuple[dict, dict], dict[str, Any]]:
    """
    Loads API mappings, OpenAPI specification, and generates a source manifest.

    This function reads API mappings from a YAML file and the OpenAPI specification from another file. 
    It validates the mappings, generates a source manifest based on the mappings and OpenAPI spec, 
    and writes the generated manifest to a specified output folder. It also retrieves chunking parameters 
    from the mappings.

    Args:
        manifest_file (pathlib.Path): Path to the YAML file containing API mappings.
        openapi_spec_file (pathlib.Path): Path to the OpenAPI specification file.
        output_folder (str): Directory path where the generated source manifest will be saved.

    Returns:
        Tuple[Tuple[str, dict], Tuple[dict, dict], dict[str, Any]]:
            - A tuple containing the API name (str) and API parameters (dict) extracted from the mappings.
            - A tuple containing:
                - The generated source manifest (dict).
                - Endpoint text fields (dict) extracted from the source manifest.
            - Chunking parameters (dict) retrieved from the mappings.

    Raises:
        Exception: If the `api_name` is not found in the mappings or if validation errors occur.
    """
    mappings = dict()
    with open(manifest_file, "r") as f:
        mappings = yaml.safe_load(f)

    # TODO: validate name only contains alphanumeric characters and underscores
    api_name = mappings.get("api_name", None)
    if not api_name:
        raise Exception("api_name not found in mappings")

    api_parameters = mappings.get("api_parameters") or {}
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

    # store generated manifest
    output_file = f"{output_folder}/{api_name}_source_generated.yaml"
    with open(output_file, "w") as out_file:
        yaml.dump(source_manifest, out_file)
        logger.debug(f"source manifest written to {output_file}")

    # get chunking params
    chunking_params = mappings.get("chunking_params", {})

    return (
        (api_name, api_parameters),
        (source_manifest, endpoint_text_fields),
        chunking_params
    )


def api_read(
    source_manifest_file: pathlib.Path,
    manifest_file: pathlib.Path,
    openapi_spec_file: pathlib.Path
) -> Tuple[Tuple[str, dict], Tuple[dict, dict], dict[str, Any]]:
    """
    Reads API mappings, OpenAPI specification, and source manifest to extract API details and configuration.

    This function reads API mappings and source manifest from specified files and validates the base definitions. 
    It also loads the OpenAPI specification and retrieves endpoint details, including schema and text properties.
    It returns a tuple containing API details, source manifest, and chunking parameters.

    Args:
        source_manifest_file (pathlib.Path): Path to the YAML file containing the source manifest.
        manifest_file (pathlib.Path): Path to the YAML file containing API mappings.
        openapi_spec_file (pathlib.Path): Path to the OpenAPI specification file.

    Returns:
        Tuple[Tuple[str, dict], Tuple[dict, dict], dict[str, Any]]:
            - A tuple containing:
                - The API name (str) extracted from the mappings.
                - API parameters (dict) extracted from the mappings.
            - A tuple containing:
                - The source manifest (dict) read from the source manifest file.
                - Endpoint text fields (dict) including stream IDs, entrypoint types, and text properties for each endpoint.
            - Chunking parameters (dict) retrieved from the mappings.

    Raises:
        Exception: If the `api_name` is not found in the mappings or if validation errors occur.
    """
    mappings = dict()
    with open(manifest_file, "r") as f:
        mappings = yaml.safe_load(f)

    # TODO: validate name only contains alphanumeric characters and underscores
    api_name = mappings.get("api_name", None)
    if not api_name:
        raise Exception("api_name not found in mappings")

    # get base api config
    api_config = mappings.get("api_config", {})

    api_parameters = mappings.get("api_parameters") or {}
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

    # Config settings
    request_method = api_config.get("request_method", "get")
    content_type = api_config.get("content_type", "application/json")
    response_entrypoint_field = api_config.get("response_entrypoint_field", "data") # TODO: consider entrypoint per endpoint

    # get endpoints from openapi spec
    openapi_endpoints = openapi_spec.get("paths", {})

    endpoint_text_fields = dict()
    # go over endpoints in api manifest
    for endpoint, details in endpoints.items():
        # get endpoint spec from openapi manifest
        openapi_endpoint_spec = openapi_endpoints.get(endpoint, {})
        # get response schema fields from endpoint spec
        schema_fields_root = get_endpoint_response_schema(
            openapi_endpoint_spec=openapi_endpoint_spec,
            request_method=request_method,
            content_type=content_type,
            response_entrypoint_field=response_entrypoint_field
        )
        logger.debug(f"schema_fields_root - {schema_fields_root}")

        # get entrypoint type
        entrypoint_type = schema_fields_root.get("type", "")
        logger.debug(f"entrypoint_type - {entrypoint_type}")

        # get response data fields
        data_fields = get_response_data_fields(schema_fields_root, entrypoint_type, openapi_spec)
        logger.debug(f"endpoint spec data fields: {data_fields}")

        # get endpoint text properties
        text_properties = get_endpoint_text_properties(
            endpoint_details=details,
            data_fields=data_fields
        )
        logger.debug(f"endpoint text fields: {text_properties}")

        # build endpoints ids
        stream_id = details.get("id", "")
        
        # set endpoint text fields to preprocess during the chunking stage
        endpoint_text_fields[endpoint] = dict(
            stream_id=stream_id,
            entrypoint_type=entrypoint_type,
            text_properties=text_properties,
        )

    # get chunking params
    chunking_params = mappings.get("chunking_params", {})

    return (
        (api_name, api_parameters),
        (source_manifest, endpoint_text_fields),
        chunking_params
    )
    

def get_dict_field(manifest_file: pathlib.Path, field_id: str) -> dict:
    """
    Retrieve a dictionary field from a YAML manifest file.

    This function reads a YAML file and returns the value associated with the specified field ID.
    If the field ID is not found, an empty dictionary is returned.

    Args:
        manifest_file (pathlib.Path): Path to the YAML manifest file.
        field_id (str): The ID of the field to retrieve.

    Returns:
        dict: The dictionary value associated with the specified field ID, or an empty dictionary if the field ID is not found.
    """
    mappings = dict()
    with open(manifest_file, "r") as f:
        mappings = yaml.safe_load(f)

    return mappings.get(field_id, {})


def get_str_field(manifest_file: pathlib.Path, field_id: str) -> str:
    """
    Retrieve a string field from a YAML manifest file.

    This function reads a YAML file and returns the value associated with the specified field ID.
    If the field ID is not found, an empty string is returned.

    Args:
        manifest_file (pathlib.Path): Path to the YAML manifest file.
        field_id (str): The ID of the field to retrieve.

    Returns:
        str: The string value associated with the specified field ID, or an empty string if the field ID is not found.
    """
    mappings = dict()
    with open(manifest_file, "r") as f:
        mappings = yaml.safe_load(f)

    return mappings.get(field_id, "")
