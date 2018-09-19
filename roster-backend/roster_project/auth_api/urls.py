from django.urls import path
from django.urls import include
from auth_api.views.login import login_view
from auth_api.views.register import register_view

from rest_framework.routers import DefaultRouter

from auth_api.views.password_reset.reset_password_view import ResetPasswordView

router = DefaultRouter()
router.register('register', register_view.RegisterView, base_name='register')

urlpatterns = [
    path('login/', login_view.LoginViewSet.as_view(), name='login'),
    path('', include(router.urls)),
    path('reset-password', ResetPasswordView.as_view({'post': 'create'}), name='reset-password')
]
