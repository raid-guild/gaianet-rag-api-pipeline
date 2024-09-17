from gaianet_rag_api_pipeline.config import logger

from airbyte.caches import CacheBase
from airbyte.sources import Source, get_source
import pandas as pd
from pathway.io.python import ConnectorSubject

import pathlib
import typing


class AirbyteAPIConnector(ConnectorSubject):

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
        self.source.check()


    def run(self):
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
        pass
