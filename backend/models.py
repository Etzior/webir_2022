from tortoise.models import Model
from tortoise import fields
from tortoise.contrib.postgres.indexes import GinIndex


class Monitor(Model):
    name = fields.CharField(max_length=255)
    brand = fields.CharField(max_length=255)
    size =fields.CharField(max_length=50)
    panel = fields.CharField(max_length=25)
    refresh_rate = fields.CharField(max_length=25)
    min_response_time =fields.CharField(max_length=25)
    screen_aspect_ratio = fields.CharField(max_length=25)
    screen_resolution = fields.CharField(max_length=25)
    url = fields.CharField(max_length=255)
    # TODO: Fill other monitor characteristics

    def __str__(self):
        return self.name

    class Meta:
        indexes = [
            GinIndex(
                fields={"name"},
                name="monitor_name_search",
            )
        ]


class EShop(Model):
    name = fields.CharField(max_length=255)

    def __str__(self):
        return self.name


class MonitorPosting(Model):
    monitor = fields.ForeignKeyField(
        "models.Monitor", related_name="posts", on_delete=fields.RESTRICT
    )
    eshop = fields.ForeignKeyField(
        "models.EShop", related_name="posts", on_delete=fields.CASCADE
    )
    price = fields.DecimalField(max_digits=16, decimal_places=2)
    in_stock = fields.BooleanField(index=True)
