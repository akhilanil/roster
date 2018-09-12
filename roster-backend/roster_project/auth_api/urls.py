from django.urls import path
from django.urls import include
from .views.login import login_view

from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('login', login_view.LoginViewSet, base_name='login')

urlpatterns = [
    path('login/', login_view.LoginViewSet.as_view(), name='login'),
]
