from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Task(models.Model):
#can remove null=True and blank=True after db is set up well
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    body = models.CharField(max_length=100, null=True, blank=True)
    important = models.BooleanField(default=False)
    complete = models.BooleanField(default=False)
    created =  models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.body

    class Meta:
        ordering = ["complete"]