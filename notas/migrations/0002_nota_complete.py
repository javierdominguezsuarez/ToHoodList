# Generated by Django 3.1.6 on 2021-02-11 18:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('notas', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='nota',
            name='complete',
            field=models.BooleanField(default=False),
        ),
    ]
