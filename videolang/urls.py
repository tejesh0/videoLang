from django.conf.urls import patterns, include, url
from django.contrib import admin
import auth

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'videolang.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include(admin.site.urls)),
    url(r'^auth/', include('auth.urls')),

)
