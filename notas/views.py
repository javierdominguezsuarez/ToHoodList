
from typing import Generic
from notas.models import Nota
from notas.serializers import NotaSerializer
from django.shortcuts import render
from rest_framework import generics, viewsets
from rest_framework import  permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from url_filter.integrations.drf import DjangoFilterBackend
from rest_framework import filters
def home_view(request, *args, **kwargs):
    print("Hello world")
    return render (request,"estilos/home.html",{'todos':Nota.objects.all()})

class NotaViewSet (viewsets.ModelViewSet):
    serializer_class = NotaSerializer
    authenticatedActions = []
    filter_backends = [filters.SearchFilter]
    search_fields = ['=complete']
    def get_permissions(self):
        if self.action in self.authenticatedActions:
            self.permission_classes =[permissions.IsAuthenticated]
        else :
            self.permission_classes = [permissions.AllowAny]
        return super().get_permissions()

    def get_queryset(self):
        try:
            user = self.request.user
            return Nota.objects.filter( user = user)
        except:
            return Nota.objects.all()

