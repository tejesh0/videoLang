from django.db import models

# Create your models here.
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User


class Video(models.Model):
    video_file = models.FileField(upload_to='documents/%Y/%m/%d')
    name = models.CharField(max_length=256)
    user = models.ForeignKey(User)
    created = models.DateTimeField(auto_now_add=True)
    deleted = models.DateTimeField(blank=True, null=True)
    updated = models.DateTimeField(auto_now=True, null=True)

    def __str__(self):
        return self.name


@receiver(post_save, sender=User)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)
