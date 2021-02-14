from notas.models import Nota
from notas.serializers import NotaSerializer
from django.shortcuts import render
from rest_framework import viewsets
from rest_framework import  permissions
from rest_framework import filters
def home_view(request, *args, **kwargs):
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

