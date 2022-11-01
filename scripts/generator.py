from time import sleep
from datetime import datetime, timedelta
from random import random
from django.utils import timezone

from generator.models import Ticker

TICKERS_N = 100
TIME_STEP = 1   # in seconds

def generate_movement():
    movement = -1 if random() < 0.5 else 1
    return movement


def populate_db(current_time):
    if Ticker.objects.all():
        last_time = Ticker.objects.latest().time
        dt = (current_time - last_time)
        if dt >= timedelta(seconds=TIME_STEP):
            for i in range(TICKERS_N):
                name_i = f"ticker_{i:02d}"
                last_item = Ticker.objects.filter(name=name_i).last()
                ticker = Ticker(name = name_i, time = current_time,
                                price = last_item.price + generate_movement())
                ticker.save()
        else:
            sleep(dt.microseconds/1000000.0)
    else:
        for i in range(TICKERS_N):
            name_i = f"ticker_{i:02d}"
            ticker = Ticker(name = name_i, time = current_time, price = 0)
            ticker.save()


def run():
    while True:
        try:
            populate_db(current_time = datetime.now(tz=timezone.utc))
        except KeyboardInterrupt:
            break
