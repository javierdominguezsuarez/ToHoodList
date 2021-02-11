from rest_framework import serializers
from .models import Nota

MAX_LENGTH = 500
class NotaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Nota
        fields = ['id','user','content','pub','hour']
    def validate_content(self, text):
        if len(text)> MAX_LENGTH:
            raise serializers.ValidationError("No te pases escribiendo bro")
        return text