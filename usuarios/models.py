from django.db import models
from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.base_user import BaseUserManager, AbstractBaseUser
# Create your models here.
class UserManager (BaseUserManager):   
    def create_user(self,email,first_name,last_name,password = None):
        if not email:
            raise ValueError("El usuario necesita un correo")
        if not password:
            raise ValueError("El usuario necesita una contraseña")
        user = self.model(
            email=self.normalize_email(email)
        )
        user.first_name = first_name
        user.last_name = last_name
        user.set_password(password)  # change password to hash
        user.is_admin = False
        user.save(using=self._db)
        return user
    def create_super_user(self,email,first_name,last_name,password = None):
        if not email:
            raise ValueError("El usuario necesita un correo")
        if not password:
            raise ValueError("El usuario necesita una contraseña")
        user = self.model(
            email=self.normalize_email(email)
        )
        user.first_name = first_name
        user.last_name = last_name
        user.set_password(password)  # change password to hash
        user.is_admin = True
        user.save(using=self._db)
        return user
class CustomUser(AbstractBaseUser,PermissionsMixin):
    username = models.CharField(max_length= 30, unique = True)
    email = models.EmailField(max_length = 250, unique = True)
    first_name = models.CharField(max_length= 30, blank= True, null = True)
    last_name = models.CharField(max_length= 30, blank= True, null = True)
    is_active = models.BooleanField(default= False)
    is_superuser = models.BooleanField(default= False)
    pub = models.DateField(auto_now_add= True)
    objects = UserManager ()
    USERNAME_FIELD = 'username'
    REQUIERED_FIELDS = ['email' ]