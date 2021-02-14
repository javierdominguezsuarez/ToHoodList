"""
Django settings for list project.

Generated by 'django-admin startproject' using Django 3.1.5.

For more information on this file, see
https://docs.djangoproject.com/en/3.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.1/ref/settings/
"""
from config.settings.base import *


DEBUG = True

ALLOWED_HOSTS = ["*"]


# Application definition

INSTALLED_APPS += [

]



STATICFILES_DIRS = [
    BASE_DIR / "notas/static",
    BASE_DIR / "notas/templates",
    BASE_DIR / "usuarios/static",
    BASE_DIR / "usuarios/templates",

    #'/var/www/static/',
]

#STATIC_URL = '/static/'
