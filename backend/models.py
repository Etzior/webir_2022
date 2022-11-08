from tortoise.models import Model
from tortoise import fields


class Monitor(Model):
    name = fields.CharField(max_length=255)
    # Fill other monitor characteristics

    def __str__(self):
        return self.name


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
