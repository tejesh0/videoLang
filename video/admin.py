from django.contrib import admin

# Register your models here.
from .models import Video


class videoAdmin(admin.ModelAdmin):
    list_display = ('video_file', 'name', 'user', 'created', 'deleted', 'updated')
    search_fields = ['video_file', 'name', 'user']

admin.site.register(Video, videoAdmin)
