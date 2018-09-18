from django.urls import path
from django.urls import include
from auth_api.views.login import login_view
from auth_api.views.register import register_view

from rest_framework.routers import DefaultRouter

from django.contrib.auth.views import PasswordResetView

router = DefaultRouter()
router.register('register', register_view.RegisterView, base_name='register')

urlpatterns = [
    path('login/', login_view.LoginViewSet.as_view(), name='login'),
    path('', include(router.urls)),
    path('reset-password', PasswordResetView.as_view(), name='reset_password')
]
