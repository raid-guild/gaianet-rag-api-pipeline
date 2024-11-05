from gaianet_rag_api_pipeline.config import ENV_FILE_PATH

import click
import dotenv
import importlib
import pathlib
import re
import requests
import shutil
import subprocess


class LazyGroup(click.Group):
    def __init__(self, *args, lazy_subcommands=None, **kwargs):
        super().__init__(*args, **kwargs)
        # lazy_subcommands is a map of the form:
        #
        #   {command-name} -> {module-name}.{command-object-name}
        #
        self.lazy_subcommands = lazy_subcommands or {}

    def list_commands(self, ctx):
        base = super().list_commands(ctx)
        lazy = sorted(self.lazy_subcommands.keys())
        return base + lazy

    def get_command(self, ctx, cmd_name):
        if cmd_name in self.lazy_subcommands:
            return self._lazy_load(cmd_name)
        return super().get_command(ctx, cmd_name)

    def _lazy_load(self, cmd_name):
        # lazily loading a command, first get the module name and attribute name
        import_path = self.lazy_subcommands[cmd_name]
        modname, cmd_object_name = import_path.rsplit(".", 1)
        # do the import
        mod = importlib.import_module(modname)
        # get the Command object from that module
        cmd_object = getattr(mod, cmd_object_name)
        # check the result to make debugging easier
        if not isinstance(cmd_object, click.BaseCommand):
            raise ValueError(
                f"Lazy loading of {import_path} failed by returning "
                "a non-command object"
            )
        return cmd_object


def ping_service(url: str, service_name: str, debug: bool = False) -> bool:
    try:
        ping = requests.get(url)
        if not ping.ok:
            raise Exception(f"ERROR: {service_name} (@ {url}). Reason: {ping.reason}")
        if debug:
            click.echo(click.style(ping.json(), fg="blue"))
        click.echo(click.style(f"{service_name} connection OK!", fg="green"))
    except Exception as e:
        click.echo(click.style(f"ERROR: {service_name} (@ {url}) is down. {e}", fg="red"), err=True)
        click.echo("Try again...")
        return False
    return True


def check_docker(debug: bool = False) -> bool:
    while True:
        docker_installed = True
        docker_running = True
        click.echo(click.style(f"Checking Docker settings...", fg="yellow"))
        # Check Docker is installed
        out = subprocess.run(["which", "docker"], capture_output=True)
        click.echo(click.style(out, fg="blue"), err=True) if debug else None
        if len(out.stdout) == 0 or len(out.stderr) > 0:
            click.echo(click.style(f"ERROR: Docker not found. Please install it before proceeding", fg="red"), err=True)
            docker_installed = False

        
        if docker_installed:
            # Check Docker daemon is running
            out = subprocess.run(["docker", "info"], capture_output=True)
            click.echo(click.style(out, fg="blue"), err=True) if debug else None
            if out.stderr.find(b"Is the docker daemon running?") > 0:
                click.echo(click.style(f"ERROR: Docker daemon is not running. Please start Docker before proceeding", fg="red"), err=True)
                docker_running = False

        if docker_running:
            break

        if not docker_installed or not docker_running:
            try_again = click.confirm(
                f"Do you want to try again?",
                default=True,
                show_default=True
            )
            if not try_again:
                return False

    click.echo(click.style(f"Docker requirements OK!", fg="green"))
    return True


def start_docker_service(service_id: str, service_name: str, debug: bool = False):
    click.echo(click.style(f"Starting a {service_name} instance using Docker....", fg="yellow"))
    out = subprocess.run(["docker", "compose", "up", service_id, "-d"], capture_output=True)
    click.echo(click.style(out, fg="blue"), err=True) if debug else None
    click.echo(f"{out.stdout.decode() if len(out.stdout) > 0 else ''}\n{out.stderr.decode()}")
    # click.echo(click.style(f"{service_name} instance running OK!", fg="green"))


@click.group(
    cls=LazyGroup,
    lazy_subcommands={"run": "run.cli"}
)
def cli():
    """
    Command-line interface (CLI) for the RAG API pipeline.
    """
    pass


@cli.command(help="Setup wizard to config the pipeline settings prior execution")
@click.option("--debug", is_flag=True, help="enable logging debug level")
@click.option(
    "--llm-provider",
    type=click.Choice(["gaia", "other"], case_sensitive=False),
    default="gaia",
    help="LLM provider",
    prompt="Which LLM provider you want to use?",
    show_choices=True,
    show_default=True
)
def setup(
    debug: bool,
    llm_provider: str    
):
    step = 1
    total_steps = 3
    click.echo(click.style(f"Init pipeline...", fg="yellow"))

    env_file = pathlib.Path(ENV_FILE_PATH)
    init_setup = True
    if env_file.exists():
        click.echo(f"A .env file already exists in {ENV_FILE_PATH}")
        init_setup = click.confirm(
            f"Do you want to init the pipeline configuration from scratch?",
            default=False,
            show_default=True
        )
        if init_setup:
            env_file.unlink()

    if init_setup:

        shutil.copyfile(f"{ENV_FILE_PATH}.sample", ENV_FILE_PATH)
        dotenv.load_dotenv(ENV_FILE_PATH)

        # ------------------------------------------------------------------------------------------------------

        click.echo(click.style(f"(Step {step}/{total_steps}) Setting Pipeline LLM provider settings...", fg="yellow"))

        llm_provider_chosen = llm_provider
        # Set LLM_PROVIDER
        if llm_provider != "gaia":
            available_llm_providers = ["openai", "ollama"]
            llm_provider = click.prompt(f"Select a custom LLM provider", type=click.Choice(available_llm_providers, case_sensitive=True), show_choices=True)
        else:
            llm_provider = "openai" # gaia uses an openai-like API server

        click.echo(f"LLM_PROVIDER={llm_provider}") if debug else None
        dotenv.set_key(ENV_FILE_PATH, key_to_set="LLM_PROVIDER", value_to_set=llm_provider)

        # Set LLM_API_BASE_URL
        llm_api_base_url_default = "http://127.0.0.1:11434" if llm_provider == "ollama" else "http://127.0.0.1:8080/v1"
        llm_api_server_url = llm_api_base_url_default
        while True:
            llm_api_server_url = click.prompt(
                "LLM provider API URL",
                type=click.STRING,
                default=llm_api_base_url_default,
                show_default=True
            )
            
            service_url = llm_api_server_url if re.search("(v1)|(v1/)$", llm_api_server_url) else f"{llm_api_server_url}/v1"
            service_url += "/models"
            if ping_service(service_url, "LLM Provider API", debug=debug):
                break
        click.echo(f"LLM_API_BASE_URL={llm_api_server_url}") if debug else None
        dotenv.set_key(ENV_FILE_PATH, key_to_set="LLM_API_BASE_URL", value_to_set=llm_api_server_url)

        # Set LLM_API_KEY
        if llm_provider_chosen == "other" and llm_provider == "openai":
            llm_api_key = click.prompt("LLM provider API Key", type=click.STRING, hide_input=True)
            click.echo(f"LLM_API_KEY value updated") if debug else None
            dotenv.set_key(ENV_FILE_PATH, key_to_set="LLM_API_KEY", value_to_set=llm_api_key)
        
        # Set LLM_EMBEDDINGS_*
        llm_embeddings_model = click.prompt("Embeddings model Name", type=click.STRING, default="Nomic-embed-text-v1.5", show_default=True)
        click.echo(f"LLM_EMBEDDINGS_MODEL={llm_embeddings_model}") if debug else None
        dotenv.set_key(ENV_FILE_PATH, key_to_set="LLM_EMBEDDINGS_MODEL", value_to_set=llm_embeddings_model)
        llm_embeddings_vector_size = click.prompt("Embeddings Vector Size", type=click.IntRange(min=0, min_open=True), default=768, show_default=True)
        click.echo(f"LLM_EMBEDDINGS_VECTOR_SIZE={llm_embeddings_vector_size}") if debug else None
        dotenv.set_key(ENV_FILE_PATH, key_to_set="LLM_EMBEDDINGS_VECTOR_SIZE", value_to_set=str(llm_embeddings_vector_size), quote_mode="never")
        if llm_provider == "ollama":
            # check Ollama is installed
            out = subprocess.run(["which", "ollama"], capture_output=True)
            if len(out.stdout) == 0 or len(out.stderr) > 0:
                click.echo(click.style(out, fg="red"), err=True) if debug else None
                click.echo(click.style(f"ERROR: Ollama not found. Please install it before proceeding", fg="red"), err=True)
                return
            # check ollama is running
            out = subprocess.run(["ollama", "-v"], capture_output=True)
            click.echo(click.style(out, fg="blue"), err=True) if debug else None
            if out.stdout.find(b"could not connect to a running Ollama instance") > 0:
                click.echo(click.style(f"ERROR: Ollama is not running. Please start Ollama before proceeding", fg="red"), err=True)
                return
            # check if model name is loaded into ollama
            model_info = subprocess.run(["ollama", "show", llm_embeddings_model], capture_output=True)
            click.echo(click.style(model_info, fg="blue"), err=True) if debug else None
            if model_info.stderr.find(b"not found") > 0:
                # request model file and load model
                embeddings_model_file = click.prompt("Enter the Path to the Embeddings model file", type=click.Path(exists=True, dir_okay=False))
                # create Modelfile
                with open("./models/Modelfile", "w") as f:
                    f.write(f"FROM {embeddings_model_file}")
                    f.close()
                # import embeddings model into Ollama
                click.echo(click.style(f"Importing embeddings model into Ollama...", fg="yellow"))
                out = subprocess.run(["ollama", "create", llm_embeddings_model, "-f", "./models/Modelfile"], capture_output=True)
                click.echo(click.style(out, fg="blue"), err=True) if debug else None
                if out.stderr.find(b"success") == -1:
                    click.echo(click.style(f"ERROR: Something went wrong. Check Ollama logs", fg="red"), err=True)
                    return
            else:
                click.echo(f"{llm_embeddings_model} model is already loaded into Ollama")

        click.echo(click.style(f"Pipeline LLM Provider settings OK!", fg="green"))

        step += 1

        # ------------------------------------------------------------------------------------------------------

        click.echo(click.style(f"(Step {step}/{total_steps}) Setting API Source settings...", fg="yellow"))

        api_key_file = "config/secrets/api_key"
        api_key = click.prompt("REST API Key", type=click.STRING, hide_input=True)
        click.echo(f"API Key value set") if debug else None
        with open(api_key_file, mode="w") as f:
            f.write(api_key)
            f.close()
        click.echo(click.style(f"API Key stored in {api_key_file}", fg="green"))

        step += 1

        # ------------------------------------------------------------------------------------------------------

        click.echo(click.style(f"(Step {step}/{total_steps}) Setting Vector DB settings...", fg="yellow"))

        external_qdrant = click.confirm(
            f"Do you have a running QdrantDB instance?",
            default=False,
            show_default=True
        )
        qdrantdb_url = "http://127.0.0.1:6333"
        if external_qdrant:
            while True:
                qdrantdb_url = click.prompt(
                    "Enter your Qdrant Server URL",
                    type=click.STRING,
                    default="http://127.0.0.1:6333",
                    show_default=True
                )
                if ping_service(qdrantdb_url, "QdrantDB", debug=debug):
                    break
        else:
            docker_running = check_docker(debug)
            if not docker_running:
                return
            out = subprocess.run(["docker", "compose", "-f", "ps"], capture_output=True)
            click.echo(click.style(out, fg="blue"), err=True) if debug else None
            if out.stdout.find(b"qdrant/qdrant:v1.10.0") == -1:
                start_docker_service("qdrant", "QdrantDB", debug)
                # TODO: ping service loop to check is qdrant is up
            else:
                click.echo(click.style(f"A QdrantDB Doker container is already running", fg="yellow"))

        click.echo(f"QDRANTDB_URL={qdrantdb_url}") if debug else None
        dotenv.set_key(ENV_FILE_PATH, key_to_set="QDRANTDB_URL", value_to_set=qdrantdb_url)

        step += 1

        # ------------------------------------------------------------------------------------------------------

        click.echo(click.style(f"Pipeline Setup completed!", fg="green"))
        click.echo(
            f"""
            You can use the pipeline by running either {click.style("rag-api-pipeline run --help", fg="yellow")}
            or {click.style("docker compose run pipeline --help", fg="yellow")}
            """
        )


def entrypoint():
    """Entry point for the CLI application. Initializes and invokes the CLI interface."""
    cli(obj={})


if __name__ == "__main__":
    entrypoint()