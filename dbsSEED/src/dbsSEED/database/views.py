from django.shortcuts import render
from rest_framework import viewsets
from .serializers import ViewSerializer
from .models import UserSummary, UserData

# Create your views here.
class UserView(viewsets.ModelViewSet):
    serializer_class = ViewSerializer
    queryset = UserSummary.objects.all()