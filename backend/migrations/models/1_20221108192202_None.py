from tortoise import BaseDBAsyncClient


async def upgrade(db: BaseDBAsyncClient) -> str:
    return """
        CREATE TABLE IF NOT EXISTS "eshop" (
    "id" SERIAL NOT NULL PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL
);
CREATE TABLE IF NOT EXISTS "monitor" (
    "id" SERIAL NOT NULL PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL
);
CREATE INDEX IF NOT EXISTS "monitor_name_search" ON "monitor" USING GIN ("name");
CREATE TABLE IF NOT EXISTS "monitorposting" (
    "id" SERIAL NOT NULL PRIMARY KEY,
    "price" DECIMAL(16,2) NOT NULL,
    "eshop_id" INT NOT NULL REFERENCES "eshop" ("id") ON DELETE CASCADE,
    "monitor_id" INT NOT NULL REFERENCES "monitor" ("id") ON DELETE RESTRICT
);
CREATE TABLE IF NOT EXISTS "aerich" (
    "id" SERIAL NOT NULL PRIMARY KEY,
    "version" VARCHAR(255) NOT NULL,
    "app" VARCHAR(100) NOT NULL,
    "content" JSONB NOT NULL
);"""


async def downgrade(db: BaseDBAsyncClient) -> str:
    return """
        """
