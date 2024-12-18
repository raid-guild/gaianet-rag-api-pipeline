from gaianet_rag_api_pipeline.config import logger

from collections.abc import Callable
from io import BytesIO
from nltk.downloader import Downloader
from pathway import ColumnExpression, UDF
from pathway.optional_import import optional_imports
from pathway.udfs import async_executor
from typing import Any
from unstructured.partition.text import partition_text


class CustomParseUnstructured(UDF):
    """
    Parse document using `https://unstructured.io/ <https://unstructured.io/>`_.

    All arguments can be overridden during UDF application.

    Args:
        - mode: single, elements or paged.
          When single, each document is parsed as one long text string.
          When elements, each document is split into unstructured's elements.
          When paged, each pages's text is separately extracted.
        - post_processors: list of callables that will be applied to all extracted texts.
        - **unstructured_kwargs: extra kwargs to be passed to unstructured.io's `partition` function
    """

    def __init__(
        self,
        mode: str = "single",
        post_processors: list[Callable] | None = None,
        capacity: int | None = None,
        **unstructured_kwargs: Any,
    ):
        # # NOTICE: disabled auto partition due to issues with dependencies and poetry (torch)
        # # More on how to install torch using poetry:
        # #  - https://github.com/python-poetry/poetry/issues/6409#issuecomment-2203773939
        # # More on unstructured system dependencies
        # # - https://github.com/Unstructured-IO/unstructured/blob/main/README.md#installing-the-library
        # # Other required dependencies:
        # # - export CFLAGS="-Wno-nullability-completeness" if trying to install pillow-heif missingn module
        # # - libmagic -> Required for having libmagic working:
        # #   - brew install libmagic
        # #   - pip install python-magic-bin
        # with optional_imports("xpack-llm-docs"):
        #     import unstructured.partition.auto  # noqa:F401

        # NOTICE: required when using text partition directly
        nltk_downloader = Downloader()
        logger.info(f"NLTK data folder: {nltk_downloader.default_download_dir()}")
        if not nltk_downloader.is_installed("popular"):
            logger.info(f"Downloading NLTK data -> popular collection...")
            nltk_downloader.download("popular", quiet=True)
        if not nltk_downloader.is_installed("punkt_tab"):
            logger.info(f"Downloading punkt_tab NLTK model...")
            nltk_downloader.download("punkt_tab")
        if not nltk_downloader.is_installed("averaged_perceptron_tagger_eng"):
            logger.info(f"Downloading averaged_perceptron_tagger_eng NLTK model...")
            nltk_downloader.download("averaged_perceptron_tagger_eng")
        ######

        super().__init__(
            deterministic=True,
            executor=async_executor(capacity=capacity) # TODO: adding more workers doesn't seems to improve execution time
        )
        _valid_modes = {"single", "elements", "paged"}
        if mode not in _valid_modes:
            raise ValueError(
                f"Got {mode} for `mode`, but should be one of `{_valid_modes}`"
            )

        self.kwargs = dict(
            mode=mode,
            post_processors=post_processors or [],
            unstructured_kwargs=unstructured_kwargs,
        )

    # # `links` and `languages` in metadata are lists, so their content should be added.
    # # We don't want return `coordinates`, `parent_id` and `category_depth` - these are
    # # element specific (i.e. they can differ for elements on the same page)
    # def _combine_metadata(self, left: dict, right: dict) -> dict:
    #     result = {}
    #     links = left.pop("links", []) + right.pop("links", [])
    #     languages = list(set(left.pop("languages", []) + right.pop("languages", [])))
    #     result.update(left)
    #     result.update(right)
    #     result["links"] = links
    #     result["languages"] = languages
    #     result.pop("coordinates", None)
    #     result.pop("parent_id", None)
    #     result.pop("category_depth", None)
    #     return result

    # def __wrapped__(self, contents: bytes, **kwargs) -> list[tuple[str, dict]]:
    async def __wrapped__(self, contents: bytes, **kwargs) -> list[dict]:
        """
        Parse the given document:

        Args:
            - contents: document contents
            - **kwargs: override for defaults set in the constructor

        Returns:
            a list of pairs: text chunk and metadata
            The metadata is obtained from Unstructured, you can check possible values
            in the `Unstructed documentation <https://unstructured-io.github.io/unstructured/metadata.html>`
            Note that when `mode` is set to `single` or `paged` some of these fields are
            removed if they are specific to a single element, e.g. `category_depth`.
        """
        # # NOTICE: disabled auto partition. See constructor for more info
        # import unstructured.partition.auto

        kwargs = {**self.kwargs, **kwargs}

        # print("kwargs", kwargs)

        # # NOTICE: disabled auto partition. See constructor for more info
        # elements = unstructured.partition.auto.partition(
        #     file=BytesIO(contents), **kwargs.pop("unstructured_kwargs")
        # )

        # NOTICE: we use partition_text directly as a workaround
        elements = partition_text(
            file=BytesIO(contents),
            **kwargs.pop("unstructured_kwargs"),
        )

        post_processors = kwargs.pop("post_processors")
        for element in elements:
            for post_processor in post_processors:
                element.apply(post_processor)

        mode = kwargs.pop("mode")

        if kwargs:
            raise ValueError(f"Unknown arguments: {', '.join(kwargs.keys())}")

        if mode == "elements":
            # docs: list[tuple[str, dict]] = list()
            # for element in elements:
            #     # NOTE(MthwRobinson) - the attribute check is for backward compatibility
            #     # with unstructured<0.4.9. The metadata attributed was added in 0.4.9.
            #     # if hasattr(element, "metadata"):
            #     #     metadata = element.metadata.to_dict()
            #     # else:
            #     #     metadata = {}
            #     # if hasattr(element, "category"):
            #     #     metadata["category"] = element.category
            #     # docs.append((str(element), metadata))
            docs: list[dict] = [el.to_dict() for el in elements]
        # elif mode == "paged":
        #     text_dict: dict[int, str] = {}
        #     meta_dict: dict[int, dict] = {}

        #     for idx, element in enumerate(elements):
        #         if hasattr(element, "metadata"):
        #             metadata = element.metadata.to_dict()
        #         else:
        #             metadata = {}
        #         page_number = metadata.get("page_number", 1)

        #         # Check if this page_number already exists in docs_dict
        #         if page_number not in text_dict:
        #             # If not, create new entry with initial text and metadata
        #             text_dict[page_number] = str(element) + "\n\n"
        #             meta_dict[page_number] = metadata
        #         else:
        #             # If exists, append to text and update the metadata
        #             text_dict[page_number] += str(element) + "\n\n"
        #             meta_dict[page_number] = self._combine_metadata(
        #                 meta_dict[page_number], metadata
        #             )

        #     # Convert the dict to a list of dicts representing documents
        #     docs = [(text_dict[key], meta_dict[key]) for key in text_dict.keys()]
        # elif mode == "single":
        #     metadata = {}
        #     for element in elements:
        #         if hasattr(element, "metadata"):
        #             metadata = self._combine_metadata(
        #                 metadata, element.metadata.to_dict()
        #             )
        #     text = "\n\n".join([str(el) for el in elements])
        #     docs = [(text, metadata)]
        else:
            raise ValueError(f"mode of {mode} not supported.")
        return docs

    def __call__(self, contents: ColumnExpression, **kwargs) -> ColumnExpression:
        """
        Parse the given document.

        Args:
            - contents: document contents
            - **kwargs: override for defaults set in the constructor

        Returns:
            A column with a list of pairs for each query. Each pair is a text chunk and
            associated metadata.
            The metadata is obtained from Unstructured, you can check possible values
            in the `Unstructed documentation <https://unstructured-io.github.io/unstructured/metadata.html>`
            Note that when `mode` is set to `single` or `paged` some of these fields are
            removed if they are specific to a single element, e.g. `category_depth`.
        """
        return super().__call__(contents, **kwargs)
