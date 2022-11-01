from django.db import models

class Ticker(models.Model):
    ticker_name = models.CharField(max_length=100)
    ticker_time = models.DateTimeField()
    ticker_price = models.IntegerField()

    def __str__(self):
        return f'{self.ticker_name, self.ticker_time.strftime("%Y-%m-%d %H:%M:%S")}'
    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['ticker_name', 'ticker_time'], name='unique_ticker_time_combination'
            )
        ]
        get_latest_by = ['ticker_name', 'ticker_time']
    

