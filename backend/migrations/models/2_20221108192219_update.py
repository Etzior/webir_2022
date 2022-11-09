from tortoise import BaseDBAsyncClient


async def upgrade(db: BaseDBAsyncClient) -> str:
    return """
        DROP INDEX "monitor_name_search";
        ALTER TABLE "monitorposting" ADD "in_stock" BOOL NOT NULL;
        CREATE INDEX "monitor_name_search" ON "monitor" USING GIN ("name");"""


async def downgrade(db: BaseDBAsyncClient) -> str:
    return """
        DROP INDEX "monitor_name_search";
        ALTER TABLE "monitorposting" DROP COLUMN "in_stock";
        CREATE INDEX "monitor_name_search" ON "monitor" USING GIN ("name");"""
