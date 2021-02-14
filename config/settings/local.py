"""
Django settings for list project.

Generated by 'django-admin startproject' using Django 3.1.5.

For more information on this file, see
https://docs.djangoproject.com/en/3.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.1/ref/settings/
"""
from config.settings.base import *

SECRET_KEY = 'qoowufju3bp*#r*!prrk=+61c(ii#woioe!@1i(p9wsk2kq5)h'
DEBUG = True

ALLOWED_HOSTS = ["*"]


# Application definition

INSTALLED_APPS += [
's3_folder_storage',
'storages'
]




STATIC_URL = 'http://thlbucket/'
STATIC_ROOT = os.path.join(os.path.dirname(BASE_DIR),"config/static")
AWS_S3_FILE_OVERWRITE = False
AWS_DEFAULT_ACL = None
DEFAULT_FILE_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'
#AWS_QUERYSTRING_AUTH = False
AWS_ACCESS_KEY_ID ='AKIAXSHEATMS2F7OSY5R'
AWS_SECRET_ACCESS_KEY ='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'
AWS_STORAGE_BUCKET_NAME = 'thlbucket'
AWS_S3_REGION_NAME="eu-west-2"
AWS_S3_HOST = "s3.eu-west-2.amazonaws.com"
STATICFILES_STORAGE = 's3_folder_storage.s3.StaticStorage'
#STATIC_URL = 'http://%s.s3.amazonaws.com/static/' % AWS_STORAGE_BUCKET_NAME
STATIC_S3_PATH = 'static/'
