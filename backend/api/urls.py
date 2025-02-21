from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('tag-list/', views.tag_list, name='tag-list'),
    path('upload-file/', views.upload_file, name='upload_file')
]
