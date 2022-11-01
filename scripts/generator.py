import datetime
from random import random
from django.utils import timezone

from generator.models import Ticker

TICKERS_N = 100

def generate_movement():
    movement = -1 if random() < 0.5 else 1
    return movement


# def populate_db():
#     while True:
#         pass

def run():
    if Ticker.objects.all():
        pass
    else:
        for i in range(TICKERS_N):
            ticker = Ticker(
                ticker_name = f"ticker_{i:02d}",
                ticker_time = datetime.datetime.now(tz=timezone.utc),
                ticker_price = 0
            )
            ticker.save()
    #populate_db()