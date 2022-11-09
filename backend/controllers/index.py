from typing import cast, Optional
from pypika.terms import AggregateFunction
from tortoise.expressions import Aggregate
from starlite import Router, get
from tortoise.expressions import Q
from tortoise.functions import Min


from models import Monitor

class BoolOrF(AggregateFunction):
    def __init__(self, term, alias=None):
        super(BoolOrF, self).__init__("BOOL_OR", term, alias=alias)

class BoolOr(Aggregate):
    """
    Returns smallest value in the column.

    :samp:`Min("{FIELD_NAME}")`
    """

    database_func = BoolOrF
    populate_field_object = True

@get("/")
async def list_monitors(
    offset: int = 0,
    limit: int = 50,
    name: Optional[str] = None,
    price_from: Optional[int] = None,
    price_to: Optional[int] = None,
    in_stock: Optional[bool] = None,
) -> list[Monitor]:

    monitor_filters = {}
    if name:
        monitor_filters["name__icontains"] = name

    postings_filters = {}
    if price_from:
        postings_filters["min_price__gte"] = price_from
    if price_to:
        postings_filters["min_price__lte"] = price_to
    if in_stock is not None:
        postings_filters["in_stock"] = in_stock

    postings = (
        Monitor.filter(
            Q(
                **monitor_filters
                # equivalent to:
                # Q(monitor__name__icontains=name),
            )
        )
        .prefetch_related("posts")
        .annotate(min_price=Min("posts__price"))
        .annotate(in_stock=BoolOr("posts__in_stock"))
        .filter(
            Q(
                **postings_filters
                # equivalent to:
                # Q(min_price__gte=price_from),
                # Q(min_price__lte=price_to),
                # Q(in_stock=in_stock),
            )
        )
        .offset(offset)
        .limit(limit)
    )

    print(await postings.explain())

    return cast("list[Monitor]", await postings)


index_router = Router(path="/", route_handlers=[list_monitors])
