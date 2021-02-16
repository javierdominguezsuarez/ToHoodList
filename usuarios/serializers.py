from config.settings.local import EMAIL_HOST_USER
from rest_framework import serializers, settings
from .models import CustomUser
from django.contrib.auth.models import User
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth import password_validation, authenticate
from django.core.mail import EmailMessage
from django.template.loader import render_to_string
# Django REST Framework
from rest_framework import serializers
from rest_framework.authtoken.models import Token
class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['username', 'email', 'first_name', 'last_name',]

class RegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
            required=True,
            validators=[UniqueValidator(queryset=CustomUser.objects.all())]
            )

    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password_again = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = CustomUser
        fields = ('username', 'password', 'password_again', 'email', 'first_name', 'last_name')

    def validate(self, attrs):
        if attrs['password'] != attrs['password_again']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})

        return attrs

    def create(self, validated_data):
        customUser = CustomUser.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name']
        )

        
        customUser.set_password(validated_data['password'])
        customUser.save()
        body = render_to_string(
            'estilos/email.html',{
                'name':validated_data['first_name']
            },
        )
        email_message = EmailMessage(
            subject = 'Bienvenido a toHoodList',
            body = body,
            from_email=EMAIL_HOST_USER,
            to = [validated_data['email']]

        )
        email_message.content_subtype = 'html'
        email_message.send()
        return customUser

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(max_length = 40)
    password = serializers.CharField(min_length=8, max_length=64)
    def validate(self, data):
        user = authenticate(username=data['username'], password=data['password'])
        if user is  None:
            raise serializers.ValidationError('No te registraste way')
        self.context['user'] = user
        return data
    def create(self, data):
        token, created = Token.objects.get_or_create(user=self.context['user'])
        return CustomUser.objects.first(), token.key