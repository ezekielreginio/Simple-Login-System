
from django.contrib import admin
from django.urls import path, include
from rest_framework.authtoken.views import obtain_auth_token
from django.views.generic import TemplateView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/', include('allauth.urls')),
    path('api/', include('api.urls')),
    path('auth/', obtain_auth_token),
    path('', include('app_dashboard.urls')),
    path('', TemplateView.as_view(template_name='index.html')),
]
