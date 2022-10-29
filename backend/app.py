from typing import cast, Optional

# from decouple import config
from dotenv import dotenv_values
from distutils.util import strtobool

from pydantic import BaseSettings
from sqlalchemy.ext.asyncio import AsyncEngine, create_async_engine

from starlite import Starlite, State, StructLoggingConfig

config = dotenv_values(".env")


class AppSettings(BaseSettings):
    DATABASE_URI = config.get(
        "DATABASE_URI", "postgresql+asyncpg://webir:webir@localhost:5432/webir"
    )


settings = AppSettings()

logging_config = StructLoggingConfig()


def get_db_connection(state: State) -> AsyncEngine:
    """Returns the db engine.

    If it doesn't exist, creates it and saves it in on the application
    state object
    """
    if not getattr(state, "engine", None):
        state.engine = create_async_engine(settings.DATABASE_URI)
    return cast("AsyncEngine", state.engine)


async def close_db_connection(state: State) -> None:
    """Closes the db connection stored in the application State object."""
    if getattr(state, "engine", None):
        await cast("AsyncEngine", state.engine).dispose()


app = Starlite(
    route_handlers=[],
    on_startup=[get_db_connection],
    on_shutdown=[close_db_connection],
    logging_config=logging_config,
    debug=bool(strtobool(config.get("DEBUG", "False"))),
)
