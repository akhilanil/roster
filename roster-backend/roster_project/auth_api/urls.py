from django.urls import path
from django.urls import include

from rest_framework.routers import DefaultRouter

from .views import LoginViewSet

router = DefaultRouter()
router.register('login', LoginViewSet, base_name='login')

urlpatterns = [
    path('', include(router.urls)),
]
