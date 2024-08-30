from gaianet_rag_api_pipeline.utils import resolve_refs

from openapi_spec_validator import validate_spec
from openapi_spec_validator.readers import read_from_filename
import pathway as pw
import pathlib
from typing import Tuple
import yaml


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
    endpoints = mappings.get("endpoints", {})
    endpoints = {endpoint: resolve_refs(details, mappings) for endpoint, details in endpoints.items()}

    # Config settings
    request_method = api_config.get("request_method", "get")
    content_type = api_config.get("content_type", "application/json")
    response_entrypoint_field = api_config.get("response_entrypoint_field", "data")
    response_primary_key = api_config.get("response_primary_key", None)

    if not response_primary_key:
        raise Exception("response_primary_key missing in mappngs api_config")

    openapi_endpoints = openapi_spec.get("paths", {})
    available_endpoints = list(openapi_endpoints.keys())

    for endpoint, details in endpoints.items():
        if not details or not details.get("id", None):
            error_msg = f"Parse error in mapping endpoint: {endpoint} - {details}"
            print(error_msg) # TODO: logger
            raise Exception(error_msg)
        
        print(f"endpoint: {endpoint}") # TODO: logger

        # make sure endpoint is in openapi spec
        if endpoint not in available_endpoints:
            error_msg = f"{endpoint} NOT found!"
            print(error_msg) # TODO: logger
            raise Exception(error_msg)
        #####

        # get endpoint spec
        endpoint_spec = openapi_endpoints.get(endpoint, {})

        # validate mandatory params
        endpoint_params = endpoint_spec.get(request_method, {}).get("parameters", {})
        required_params = [param for param in endpoint_params if param.get("required", False)]
        print(f"\t - required params: {[p.get('name', '') for p in required_params]}") # TODO: logger
        for p in required_params:
            if p.get("name", None) not in source_parameters:
                error_msg = f"{p} not found in mapping parameters"
                print(error_msg) # TODO: logger
                raise Exception(error_msg)
        #####

        # update endpoint path with url params
        path_params = [param.get("name", "") for param in required_params if param.get("in", "") == "path"]
        print(f"\t - path params: {path_params}") # TODO: logger  
        endpoint_path = f"{endpoint}"
        for param in path_params:
            endpoint_path = endpoint_path.replace(f"{param}", f"{{ config['{param}'] }}")
        #####

        # add query params if passed as source_parameters
        query_params = [param.get("name", "") for param in endpoint_params if param.get("in", "") == "query"]
        match_query_params = [param for param in query_params if param in source_parameters]
        print(f"\t - available query params: {query_params}") # TODO: logger
        print(f"\t - found query params: {match_query_params}") # TODO: logger
        # building endpoint request options
        request_options = dict()
        if len(match_query_params):
            request_params = { param: f"{{ config['{param}'] }}" for param in match_query_params }
            request_options["request_options_provider"] = {
                "request_parameters": request_params,
            }
        #####

        # get response schema from endpoint spec
        response_schema = endpoint_spec.\
            get(request_method, {}).\
            get("responses", {}).get("200", {}).\
            get("content", {}).get(content_type, {}).\
            get("schema", {})

        data_root = response_schema.\
            get("properties", {}).\
            get(response_entrypoint_field, {})

        entrypoint_type = data_root.get("type", "")
        #####

        # validate textSchemas exist in response schema
        # fields specified in textSchemas will be extracted to be preprocessed
        # other response data fields will be included as json metadata
        text_properties = details.\
            get("textSchema", {}).\
            get("properties", {})
        data_fields = resolve_refs(data_root, openapi_spec)

        # get response data fields
        if entrypoint_type == "array":
            # need to get properties from nested items spec
            data_fields = data_fields.\
                get("items", {})
        data_fields = data_fields.get("properties", {})
        fields_list = list(data_fields.keys())    
        print(f"endpoint text fields: {text_properties}") # TODO: logger
        print(f"endpoint spec data fields: {data_fields}") # TODO: logger

        # validate text properties are in the endpoint openapi spec as response data fields
        for field, props in text_properties.items():
            if field not in fields_list or props.get("type", "") != data_fields[field].get("type", ""):
                error_msg = f"endpoint field not found or mismatch in openapi spec: {field} - {props}"
                print(error_msg) # TODO: logger
                raise Exception(error_msg)
        
        # update endpoint pre-process text fields
        endpoint_text_fields[endpoint] = text_properties

        # setup pagination
        needs_pagination = entrypoint_type == "array"
        print(f"response schema: needs pagination? {needs_pagination} - {response_schema}") # TODO: logger
        #####
        
        # build endpoint stream definition
        endpoint_id = details.get("id", "")
        stream_id = f"{endpoint_id}_stream"
        stream_definitions[stream_id] = {
            "$ref": f"#/definitions/{'paging_stream' if needs_pagination else 'single_stream'}" ,
            "schema_loader": {
                "type": "InlineSchemaLoader",
                "schema": {
                    "$ref": details.get("responseSchema", ""),
                },
            },
            "$parameters": {
                "name": endpoint_id,
                "primary_key": response_primary_key,
                "path": f'"{endpoint_path}"',
            },
            **request_options
        }
            
        stream_refs.append(f"#/definitions/{stream_id}")
        stream_names.append(endpoint_id)

        stream_yaml_spec = yaml.dump(stream_definitions[stream_id])
        print(f"stream spec:\n {stream_yaml_spec}\n\n") # TODO: logger

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
    mapping_file: pathlib.Path,
    openapi_spec_file: pathlib.Path,
    output_folder: str,
) -> Tuple[Tuple[str, dict], Tuple[dict, str]]:
    mappings = dict()
    with open(mapping_file, "r") as f:
        mappings = yaml.safe_load(f)

    # TODO: validate name only contains alphanumeric characters and underscores
    api_name = mappings.get("api_name", None)
    if not api_name:
        raise Exception("api_name not found in mappings")

    api_parameters = mappings.get("api_parameters", None)
    print(f"api parameters - {api_parameters}") # TODO: logger

    # validate "base stream" definitions are in mappings
    defIds = list(mappings.get("definitions", {}).keys())
    for refId in ["paging_stream", "single_stream"]:
        if refId not in defIds:
            print(f"{refId} is missing in mapping definitions") # TODO: logger
            raise Exception(f"{refId} stream is missing in mappings")

    # load openapi spec
    (openapi_spec, _) = read_from_filename(openapi_spec_file)

    # validate openapi spec
    try:
        validate_spec(openapi_spec)
    except Exception as error:
        print(f"Spec not valid. A {type(error).__name__} error was raised", error) # TODO: logger
        raise error

    # generate source manifest
    (source_manifest, endpoint_text_fields) = generate_source_manifest(
        mappings=mappings,
        openapi_spec=openapi_spec,
    )

    # store generated manifest
    output_file = f"{output_folder}/{api_name}_source_generated.yaml"
    with open(output_file, "w") as out_file:
        yaml.dump(source_manifest, out_file)
        print(f"source manifest written to {output_file}") # TODO: logger

    return (
        (api_name, api_parameters),
        (source_manifest, endpoint_text_fields),
    )
    
