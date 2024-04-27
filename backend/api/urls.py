from django.urls import path
from . import views

urlpatterns = [
    path('send-array', views.send_array, name="send-array"),
]