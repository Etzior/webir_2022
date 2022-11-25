from tortoise import BaseDBAsyncClient


async def upgrade(db: BaseDBAsyncClient) -> str:
    return """
        DROP INDEX "monitor_name_search";
        ALTER TABLE "monitor" ADD "img_url" VARCHAR(255);
        CREATE INDEX "monitor_name_search" ON "monitor" USING GIN ("name");;"""


async def downgrade(db: BaseDBAsyncClient) -> str:
    return """
        DROP INDEX "monitor_name_search";
        ALTER TABLE "monitor" DROP COLUMN "img_url";
        ALTER TABLE "monitorposting" DROP COLUMN "url";
        CREATE INDEX "monitor_name_search" ON "monitor" USING GIN ("name");;"""
