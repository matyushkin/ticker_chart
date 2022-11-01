import datetime
from random import random
from django.utils import timezone

from generator.models import Ticker

TICKERS_N = 100
TIME_STEP = 1   # in seconds

def generate_movement():
    movement = -1 if random() < 0.5 else 1
    return movement


# def populate_db():
#     while True:
#         pass

def run():
    current_time = datetime.datetime.now(tz=timezone.utc)
    for i in range(TICKERS_N):
        name_i=f"ticker_{i:02d}
        last_item = Ticker.objects.filter(name=name_i).last()
        if last_item:
            pass
        else:
            ticker = Ticker(
                name = f"ticker_{i:02d}",
                time = current_time,
                price = 0
            )
            ticker.save()


    #populate_db()