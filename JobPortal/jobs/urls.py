# JobPortalProject/jobs/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('', views.homepage, name='homepage'),
    path('find-jobs/', views.find_jobs, name='find_jobs'),
    path('companies/', views.companies, name='companies'),
    path('about-us/', views.about_us, name='about_us'),
    path('contact/', views.contact, name='contact'),
    path('foremployers/', views.foremployers, name='foremployers'),
    # path('admin-panel/', views.admin_panel, name='admin_panel'),

    # Add these placeholder URLs for authentication (will point to actual Django auth views later)
    path('login/', views.user_login, name='login'),
    path('register/', views.user_register, name='register'),
]