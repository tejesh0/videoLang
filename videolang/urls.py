from django.conf.urls import patterns, include, url
from django.contrib import admin
from django.views.decorators.csrf import csrf_exempt
import video.api
import video.views


urlpatterns = patterns('',
                       # Examples:
                       # url(r'^$', 'videolang.views.home', name='home'),
                       # url(r'^blog/', include('blog.urls')),

                       url(r'^admin/', include(admin.site.urls)),
                       url(r'^api-token-auth/', 'rest_framework_jwt.views.obtain_jwt_token'),
                       url(r'^signup', csrf_exempt(video.api.CreateUserView.as_view())),
                       url(r'^upload-video', video.views.list),
                       )
