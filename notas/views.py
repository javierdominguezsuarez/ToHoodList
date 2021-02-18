from rest_framework.fields import SerializerMethodField
from rest_framework.serializers import Serializer
from notas.models import Nota
from notas.serializers import NotaCreateSerializer, NotaSerializer
from django.shortcuts import render
from rest_framework import viewsets
from rest_framework import  permissions
from rest_framework import filters
from rest_framework.authentication import  TokenAuthentication
from rest_framework.response import Response

def home_view(request, *args, **kwargs):
    return render (request,"estilos/home.html",{'todos':Nota.objects.all()})

class NotaViewSet (viewsets.ModelViewSet):

    serializer_class = NotaSerializer
    authentication_classes = [TokenAuthentication]
    authenticatedActions = ['create','update','partial_update','destroy', 'list' ]
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
            return []

    def get_serializer_class(self, *args, **kwargs):
        
        if self.request.method == 'POST':
            return NotaCreateSerializer
        return super().get_serializer_class(*args, **kwargs)
 
    def create(self, request):
        todo = NotaCreateSerializer(data = request.data)
        todo.context['request'] = request
        todo.is_valid(raise_exception=True)
        todo = todo.save()
        todo = NotaSerializer(todo, many=False)
        return Response(todo.data)


        
