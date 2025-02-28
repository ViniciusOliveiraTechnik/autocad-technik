from django.db import models
from django.contrib.auth.models import User
import uuid

# Create your models here.
class Tag(models.Model):
    id = models.UUIDField(primary_key=True, unique=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    old_tag = models.CharField(max_length=80, default='', blank=False)
    new_tag = models.CharField(max_length=80, default='', blank=False)

    def __str__(self):
        return f'Tag {self.old_tag} -> {self.new_tag}'

