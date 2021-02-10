from django.db import models
from django.conf import settings
# Create your models here


class Nota (models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE)
    content = models.TextField(blank=False,null=False)
    pub = models.DateField(auto_now_add=True)
    hour = models.TimeField(auto_now_add=True)
    class Meta :
        ordering = ['-pub','-hour']