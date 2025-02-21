from django.db import models
import uuid

# Create your models here.
class Tag(models.Model):
    id = models.UUIDField(primary_key=True, unique=True, default=uuid.uuid4, editable=False)
    old_tag = models.CharField(max_length=80, default='', blank=False)
    new_tag = models.CharField(max_length=80, default='', blank=False)

    def __str__(self):
        return f'Tag {self.old_tag} -> {self.new_tag}'
