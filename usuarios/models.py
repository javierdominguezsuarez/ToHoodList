from django.db import models
from django.contrib.auth.models import AbstractUser, PermissionsMixin
from django.contrib.auth.base_user import BaseUserManager, AbstractBaseUser
# Create your models here.

class CustomUser(AbstractUser):
    pass
    
    