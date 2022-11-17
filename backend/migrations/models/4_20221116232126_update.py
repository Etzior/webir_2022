from tortoise import BaseDBAsyncClient


async def upgrade(db: BaseDBAsyncClient) -> str:
    return """
        DROP INDEX "monitor_name_search";
        CREATE INDEX "monitor_name_search" ON "monitor" USING GIN ("name");;"""


async def downgrade(db: BaseDBAsyncClient) -> str:
    return """
        DROP INDEX "monitor_name_search";
        CREATE INDEX "monitor_name_search" ON "monitor" USING GIN ("name");;"""
