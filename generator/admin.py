from django.contrib import admin
from .models import Ticker

@admin.register(Ticker)
class TickerAdmin(admin.ModelAdmin):
    pass
