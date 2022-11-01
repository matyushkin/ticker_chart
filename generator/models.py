from django.db import models

class Ticker(models.Model):
    name = models.CharField(max_length=100)
    time = models.DateTimeField()
    price = models.IntegerField()

    def __str__(self):
        return f'{self.name, self.time.strftime("%Y-%m-%d %H:%M:%S")}'
    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['name', 'time'], name='unique_name_time_combination'
            )
        ]
        get_latest_by = ['name', 'time']
    

