from gaianet_rag_api_pipeline.config import logger

import os
import re
import requests


localhost_regex = r"(localhost)|(127.0.0.1)|(0.0.0.0)"


def ping_service(url: str, service_name: str) -> bool:
    """
    Check if a specified service is reachable by sending an HTTP GET request to its URL.

    This function attempts to connect to the service at the provided URL and verifies if it responds successfully.
    It logs detailed debugging information about the service response and reports an error if the service is unreachable.

    Args:
        url (str): The URL of the service to check.
        service_name (str): The name of the service being checked, used for logging purposes.

    Returns:
        bool: True if the service responds with a successful HTTP status code; False otherwise.

    Side Effects:
        - Logs detailed debug information about the service response.
        - If the service is down or unresponsive, logs an error message indicating the issue.
    """
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
    """
    Replace the localhost part of a service URL with a Docker DNS name if running in a Docker environment.

    This function checks the `BUILD_ENVIRONMENT` environment variable to determine if the current environment is Docker.
    If so, it replaces any localhost reference in `service_url` with the specified Docker DNS name (`docker_dns`).
    Otherwise, it returns the URL unchanged.

    Args:
        service_url (str): The original service URL, which may include "localhost".
        docker_dns (str): The Docker DNS name to use as a replacement (e.g., "host.docker.internal" or a container alias).

    Returns:
        str: The potentially modified service URL, with localhost replaced by Docker DNS if in a Docker environment.

    Environment Variables:
        BUILD_ENVIRONMENT: If set to "docker", the function performs the URL replacement.
    """
    build_environment = os.environ.get('BUILD_ENVIRONMENT')

    service_url = re.sub(localhost_regex, docker_dns, service_url) \
        if build_environment == "docker" \
        else service_url
    
    return service_url

