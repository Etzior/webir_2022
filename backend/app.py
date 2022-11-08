from starlite import Starlite, StructLoggingConfig
from starlite.plugins.tortoise_orm import TortoiseORMPlugin
from pydantic import BaseSettings
from tortoise import Tortoise
from tortoise.connection import connections

from dotenv import dotenv_values
from distutils.util import strtobool

from controllers.index import index_router


config = dotenv_values(".env")


class AppSettings(BaseSettings):
    DATABASE_URI = config.get("DATABASE_URL", "sqlite://:memory:")


settings = AppSettings()

logging_config = StructLoggingConfig()


async def init_tortoise() -> None:
    # TODO: Use Postgres instead of Sqlite
    await Tortoise.init(db_url=settings.DATABASE_URI, modules={"models": ["models"]})
    await Tortoise.generate_schemas()


async def shutdown_tortoise() -> None:
    await connections.close_all()


app = Starlite(
    route_handlers=[index_router],
    on_startup=[init_tortoise],
    on_shutdown=[shutdown_tortoise],
    logging_config=logging_config,
    plugins=[TortoiseORMPlugin()],
    debug=bool(strtobool(str(config.get("DEBUG", "False")))),
)
