from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('recieve-file/', views.recieve_file, name='recieve-file'),
    path('extract-tags/<str:file_id>', views.extract_tags, name='extract-tags'),
]
