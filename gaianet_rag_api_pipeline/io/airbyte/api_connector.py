from gaianet_rag_api_pipeline.config import logger

from airbyte.caches import CacheBase
from airbyte.sources import Source, get_source
import pandas as pd
from pathway.io.python import ConnectorSubject

import pathlib
import typing


class AirbyteAPIConnector(ConnectorSubject):
    """
    AirbyteAPIConnector is responsible for interacting with Airbyte sources and streams. It handles
    loading the source, managing stream selection, reading data, and passing records downstream.
    
    Attributes:
        source (Source): The Airbyte source object loaded from the provided configuration.
        cache (CacheBase | None): Cache mechanism used to store read results.
        force_full_refresh (bool): Whether to force a full refresh of the source's data.
        skip_validation (bool): If True, skips source validation during read operations.
    """

    source: Source

    def __init__(
        self,
        # Airbyte specific
        name: str,
        config: dict[str, typing.Any] | None = None,
        *args,
        streams: str | list[str] | None = None,
        version: str | None = None,
        source_manifest: bool | dict | pathlib.Path | str = False,
        install_if_missing: bool = True,
        install_root: pathlib.Path | None = None,
        # Airbyte source.read specific
        cache: CacheBase | None = None,
        force_full_refresh: bool = False,
        skip_validation: bool = False,
        # Pathway specific
        # mode: str, # TODO: how to perform streaming vs static?
        # refresh_interval_ms: int, # used for time.sleep. This is handled by airbyte through correct params in manifest
        check_source: bool = True,
        # *args,
        **kwargs,
    ):
        """
        Initializes the AirbyteAPIConnector by setting up the Airbyte source, selecting streams,
        and optionally validating the source.
        Args:
            name (str): The name of the Airbyte source.
            config (dict[str, typing.Any] | None, optional): Configuration settings for the source.
            streams (str | list[str] | None, optional): Specific stream(s) to read from the source.
            version (str | None, optional): Version of the source connector.
            source_manifest (bool | dict | pathlib.Path | str, optional): Manifest for the Airbyte source. Defaults to False.
            install_if_missing (bool, optional): If True, installs the source connector if it's missing. Defaults to True.
            install_root (pathlib.Path | None, optional): Root directory for installing connectors. Defaults to None.
            cache (CacheBase | None, optional): Cache for storing read results. Defaults to None.
            force_full_refresh (bool, optional): Forces a full refresh when reading data. Defaults to False.
            skip_validation (bool, optional): Skips validation during the source read process. Defaults to False.
            check_source (bool, optional): If True, performs a source check after initialization. Defaults to True.
            **kwargs: Additional arguments passed to the parent class.
        
        Raises:
        ValueError: If the source configuration or manifest is invalid.
    
        Side Effects:
            Logs debug messages during initialization and stream selection.
        """
        super().__init__(*args, **kwargs)
        logger.debug(f"Creating new Airbyte source: {name}")
        logger.debug(f"Source manifest - {source_manifest}")
        self.source = get_source(
            name=name,
            config=config,
            streams=streams,
            source_manifest=source_manifest,
            install_if_missing=install_if_missing,
            install_root=install_root
        )
        logger.debug(f"Airbyte source {name} loaded.")

        # select streams
        if streams: self.source.select_streams(streams)
        else: self.source.select_all_streams()

        logger.debug(f"Selected streams: {streams}")

        # check source yaml definition is correct
        if check_source:
            logger.debug(f"Checking source...")
            self.check()

        # read parameters
        self.cache = cache
        self.force_full_refresh = force_full_refresh
        self.skip_validation = skip_validation

    
    def check(self):
        """Validates the Airbyte source configuration to ensure proper setup."""
        self.source.check()


    def run(self):
        """Reads data from the selected streams and passes each record downstream."""
        logger.debug(f"reading data...")
        result = self.source.read(
            cache=self.cache,
            force_full_refresh=self.force_full_refresh,
            skip_validation=self.skip_validation
        )
        logger.debug(f"reading data - Done.")
        for stream_name, data in result.streams.items():
            logger.debug(f"{stream_name}: {len(data)} records")
            # DEPRECATED
            # # NOTICE: workaround to remove duplicate records that contains the latest page
            # # with null cursor. This happens when running multiple times with force_full_refresh
            # # TODO: how to clean up cache completely so recods with null nextCursor are removed
            # df = data.to_pandas()
            # df_clean = df.dropna(how='any', ignore_index=True) # drop record pages with null nextCursor
            # df_null = df[df.isna().any(axis=1)] # get record pages with null nextCursor
            # df_final = pd.concat([
            #     df_clean,
            #     df_null.iloc[[0], :] # include the latest page
            # ])
            # records = df_final.to_dict(orient='records')
            records = list(data)

            for row in records:
                self.next(stream=stream_name, **row)


    def on_stop(self):
        """Handles any cleanup or shutdown logic when stopping the connector (currently not implemented)."""
        pass
