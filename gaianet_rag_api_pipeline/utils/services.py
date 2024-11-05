from gaianet_rag_api_pipeline.config import logger

import os
import re
import requests


localhost_regex = r"(localhost)|(127.0.0.1)|(0.0.0.0)"


def ping_service(url: str, service_name: str) -> bool:
    try:
        ping = requests.get(url)
        if not ping.ok:
            logger.debug(f"ERROR: {service_name} (@ {url}). Reason: {ping.reason}")
            return False
        logger.debug(ping.json())
    except Exception as e:
        logger.debug((f"ERROR: {service_name} (@ {url}) is down. {e}"))
        return False
    return True


def docker_replace_local_service_url(service_url: str, docker_dns: str) -> str:
    build_environment = os.environ.get('BUILD_ENVIRONMENT')

    service_url = re.sub(localhost_regex, docker_dns, service_url) \
        if build_environment == "docker" \
        else service_url
    
    return service_url

