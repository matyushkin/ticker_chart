from random import random
import time
from datetime import datetime
import sched
from django.utils import timezone

from generator.models import Ticker

TICKERS_N = 100
TIME_STEP = 1   # in seconds


def perf_sleep(duration, get_now=time.perf_counter):
    now = get_now()
    end = now + duration
    while now < end:
        now = get_now()


def generate_movement():
    movement = -1 if random() < 0.5 else 1
    return movement


def populate_db():
    current_time = datetime.now(tz=timezone.utc)
    for i in range(TICKERS_N):
        name_i = f"ticker_{i:02d}"
        last_item = Ticker.objects.filter(name=name_i).last()
        ticker = Ticker(name = name_i,
                        time = current_time,
                        price = last_item.price + generate_movement())
        ticker.save()


def run():
    clocks = time.time()
    s = sched.scheduler(time.time, perf_sleep)
    if not Ticker.objects.all():
        for i in range(TICKERS_N):
            ticker = Ticker(name = f"ticker_{i:02d}",
                            time = datetime.now(tz=timezone.utc),
                            price = 0)
            ticker.save()
    else:
        while True:
            try:
                clocks += TIME_STEP
                s.enterabs(clocks, 0, populate_db)
                s.run()
            except KeyboardInterrupt:
                break
