from django.urls import path
from django.urls import include
from rest_framework.routers import DefaultRouter
from .views import ManageRosterView

router = DefaultRouter()
router.register('new-roster', ManageRosterView, base_name='new-roster')

urlpatterns = [
    path('', include(router.urls)),
]
