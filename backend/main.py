from starlite import Starlite, get

"""
MUST READ -> https://starlite-api.github.io/starlite/usage/0-the-starlite-app/0-the-starlite-app/
"""

@get("/")
def hello_world() -> dict[str, str]:
    """Keeping the tradition alive with hello world."""
    return {"hello": "world"}


app = Starlite(route_handlers=[hello_world])
