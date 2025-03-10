from django.db import models
import uuid

# Create your models here.
class File(models.Model):
    id = models.UUIDField(primary_key=True, unique=True, default=uuid.uuid4, editable=False)
    created_at = models.DateTimeField(auto_now_add=True)
    file_path = models.CharField(max_length=260)
    file_name = models.CharField(max_length=80)

    def __str__(self):
        return f'{self.file_path} -> {self.file_name}'
    
class Tag(models.Model):
    id = models.UUIDField(primary_key=True, unique=True, default=uuid.uuid4, editable=False)
    file_id = models.ForeignKey(File, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    old_tag = models.CharField(max_length=80, default='', blank=False)
    new_tag = models.CharField(max_length=80, default='', blank=False)

    def __str__(self):
        return f'Tag {self.old_tag} -> {self.new_tag}'


