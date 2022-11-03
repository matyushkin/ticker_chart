from django.db import models

class Ticker(models.Model):
    name = models.CharField(max_length=100)
    time = models.DateTimeField()
    price = models.IntegerField()

    def __str__(self):
        return f'{self.time.strftime("%Y-%m-%d %H:%M:%S"), self.name, self.price}'
    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['time', 'name'], name='unique_time_name_combination'
            )
        ]
        get_latest_by = ['time', 'name']
    

