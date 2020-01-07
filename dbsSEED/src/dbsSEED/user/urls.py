from django.urls import path
from .views import user_data_view

urlpatterns = [
    path("<int:id>/", user_data_view, name="user"),
]