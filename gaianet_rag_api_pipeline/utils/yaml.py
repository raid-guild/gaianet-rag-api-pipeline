from enum import Enum


class YamlDataTypes(Enum):
    string = str
    object = dict
    array = list
    number = float
    integer = int
    boolean = bool


def resolve_refs(data, root):
    if isinstance(data, dict):
        for key, value in data.items():
            if key == '$ref':
                # Extract the reference path
                ref_path = value.lstrip('#/').split('/')
                
                # Navigate to the referenced object
                ref_obj = root
                for part in ref_path:
                    ref_obj = ref_obj.get(part, {})
                
                # Merge the referenced object in place of the $ref
                return resolve_refs(ref_obj, root)
            else:
                data[key] = resolve_refs(value, root)
    elif isinstance(data, list):
        return [resolve_refs(item, root) for item in data]
    
    return data
