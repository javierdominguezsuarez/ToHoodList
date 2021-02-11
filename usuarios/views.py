from usuarios.serializers import RegisterSerializer
from django.contrib.auth.models import Permission
from usuarios.models import CustomUser
from rest_framework import viewsets
from django.shortcuts import render
from rest_framework import permissions
# Create your views here.
class RegisterViewSet (viewsets.ModelViewSet):
    serializer_class = RegisterSerializer
    queryset = CustomUser.objects.all()
    permission_classes = (permissions.AllowAny,)

