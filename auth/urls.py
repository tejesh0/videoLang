from django.conf.urls import patterns, url

urlpatterns = patterns('auth.views',
                       # Examples:
                       # url(r'^$', 'videolang.views.home', name='home'),
                       # url(r'^blog/', include('blog.urls')),

                       url(r'^signup/$', 'signup', name="signup"),
                       )
