from rest_framework import serializers
from .models import Nota

MAX_LENGTH = 500
class NotaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Nota
        fields = ['id','user','content','pub','hour', 'complete']
    def validate_content(self, text):
        if len(text)> MAX_LENGTH:
            raise serializers.ValidationError("No te pases escribiendo bro")
        return text

class NotaCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Nota
        fields = ['content']
    def validate_content(self, text):
        if len(text)> MAX_LENGTH:
            raise serializers.ValidationError("No te pases escribiendo bro")
        return text    

    def save (self):
        return self.Meta.model.objects.create(content = self.validated_data['content'], user = self.context['request'].user)
