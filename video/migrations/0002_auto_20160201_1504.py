# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('video', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Video',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('video_file', models.FileField(upload_to=b'documents/%Y/%m/%d')),
                ('name', models.CharField(max_length=256)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('deleted', models.DateTimeField(null=True, blank=True)),
                ('updated', models.DateTimeField(auto_now=True, null=True)),
                ('user', models.ForeignKey(to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.DeleteModel(
            name='Document',
        ),
    ]
