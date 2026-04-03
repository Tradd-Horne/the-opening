from django.urls import path
from . import views

urlpatterns = [
    path('', views.IndexView.as_view(), name='index'),
    path('about/', views.AboutView.as_view(), name='about'),
    path('work/', views.WorkView.as_view(), name='work'),
    path('collective/', views.CollectiveView.as_view(), name='collective'),
    path('contact/', views.ContactView.as_view(), name='contact'),
]
