from django.contrib import admin
from .models import UserData, UserSummary

# Register your models here.
class AdminPageMain(admin.ModelAdmin):
    list_display = ["name", "transaction_amount", "transaction_type", "transaction_category"]

class AdminPageSummary(admin.ModelAdmin):
    list_display = ["name", "credit", "debit"]


admin.site.register(UserData, AdminPageMain)
admin.site.register(UserSummary, AdminPageSummary)
