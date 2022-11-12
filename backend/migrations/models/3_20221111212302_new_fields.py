from tortoise import BaseDBAsyncClient


async def upgrade(db: BaseDBAsyncClient) -> str:
    return """
        DROP INDEX "monitor_name_search";
        CREATE INDEX "monitor_name_search" ON "monitor" USING GIN ("name");
        ALTER TABLE monitor ADD COLUMN brand VARCHAR(255) NOT NULL;
        ALTER TABLE monitor ADD COLUMN size VARCHAR(50) NOT NULL;
        ALTER TABLE monitor ADD COLUMN panel VARCHAR(25) NOT NULL;
        ALTER TABLE monitor ADD COLUMN refresh_rate VARCHAR(25) NOT NULL;
        ALTER TABLE monitor ADD COLUMN min_response_time VARCHAR(25);
        ALTER TABLE monitor ADD COLUMN screen_aspect_ratio VARCHAR(25);
        ALTER TABLE monitor ADD COLUMN screen_resolution VARCHAR(25);
        ALTER TABLE monitor ADD COLUMN url VARCHAR(255);
        """


async def downgrade(db: BaseDBAsyncClient) -> str:
    return """
        DROP INDEX "monitor_name_search";
        CREATE INDEX "monitor_name_search" ON "monitor" USING GIN ("name");"""
