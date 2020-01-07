from django.db import models
from datetime import datetime

# Create your models here.


class UserData(models.Model):
    name = models.CharField(max_length=50)
    account_id = models.IntegerField()
    transaction_amount = models.DecimalField(max_digits=10, decimal_places=2)
    transaction_id = models.CharField(max_length=50)
    transaction_date = models.CharField(max_length=50)
    transaction_type = models.CharField(max_length=10, null=True)
    transaction_category = models.CharField(max_length=20, null=True)


class UserSummary(models.Model):
    name = models.CharField(max_length=50, null=True)
    credit = models.DecimalField(max_digits=10, decimal_places=2)
    debit = models.DecimalField(max_digits=10, decimal_places=2)
    breakdown = models.TextField(null=True)



