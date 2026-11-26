from django.urls import path
from . import views

urlpatterns = [
    path('', views.IndexView.as_view(), name='index'),
    path('mission/', views.MissionView.as_view(), name='mission'),
    path('practice/', views.PracticeView.as_view(), name='practice'),
    path('work/', views.WorkView.as_view(), name='work'),
    path('contact/', views.ContactView.as_view(), name='contact'),
]
