from django.urls import path
from . import views

urlpatterns = [
    # Маршрут для получения рекомендаций
    path('recommendations/', views.recommendations_view, name='recommendations'),
]
