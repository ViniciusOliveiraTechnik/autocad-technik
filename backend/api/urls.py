from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('connect-file/', views.connect_file, name='tag-list'),
    path('upload-file/', views.upload_file, name='upload_file')
]
