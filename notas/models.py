from django.db import models
from django.conf import settings
from django.contrib.auth import get_user_model
# Create your models here


class Nota (models.Model):
    user = models.ForeignKey(get_user_model(),on_delete=models.CASCADE)
    content = models.TextField(blank=False,null=False)
    pub = models.DateField(auto_now_add=True)
    hour = models.TimeField(auto_now_add=True)
    class Meta :
        ordering = ['-pub','-hour']