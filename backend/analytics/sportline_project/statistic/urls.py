from django.urls import path
from . import views

urlpatterns = [
    path('statistic', views.get_user_statistics, name='statistics_details'),  # Пример с детализацией
]
