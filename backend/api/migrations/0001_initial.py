# Generated by Django 5.1.6 on 2025-02-19 13:45

import uuid
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Tag',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False, unique=True)),
                ('old_tag', models.CharField(default='', max_length=80)),
                ('new_tag', models.CharField(default='', max_length=80)),
            ],
        ),
    ]
