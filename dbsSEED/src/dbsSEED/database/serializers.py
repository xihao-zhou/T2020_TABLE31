from rest_framework import serializers
from .models import UserData, UserSummary

class ViewSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserSummary
        fields = ("name", "credit", "debit", "breakdown")