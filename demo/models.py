from django.db import models

class Favorite(models.Model):
    favorite = models.BooleanField(default=False)

