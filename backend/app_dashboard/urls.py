from django.urls import path, include

from . import views
urlpatterns = [
    path('login/', views.login_dashboard),
    path('register/', views.register),
    path('dashboard/', views.dashboard)
]