from typing import cast
from starlite import Router, get


from models import MonitorPosting


@get("/")
async def index() -> list[MonitorPosting]:
    postings = await MonitorPosting.all()
    return cast("list[MonitorPosting]", postings)


index_router = Router(path="/", route_handlers=[index])
