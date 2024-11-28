from django.db import models
import uuid

class Category(models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name

class User(models.Model):
    id = models.BigAutoField(primary_key=True)
    username = models.CharField(max_length=150, unique=True)
    email = models.EmailField(unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.username

class UserPreference(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='preferences')
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='user_preferences')

    class Meta:
        managed = False
        unique_together = ('user', 'category')

    def __str__(self):
        return f"{self.user.username} - {self.category.name}"
class Route(models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=200)
    distance = models.FloatField()  # Расстояние в километрах
    duration = models.FloatField()  # Длительность в минутах
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name
class RouteCategory(models.Model):
    route = models.ForeignKey(Route, on_delete=models.CASCADE, related_name='categories')
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='route_categories')

    class Meta:
        managed = False
        unique_together = ('route', 'category')

    def __str__(self):
        return f"{self.route.name} - {self.category.name}"
