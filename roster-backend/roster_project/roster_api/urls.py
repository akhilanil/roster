from django.urls import path
from django.urls import include
from rest_framework.routers import DefaultRouter
from .views import manage_roster_view

router = DefaultRouter()
router.register(
    'new-roster', manage_roster_view.ManageRosterView, base_name='new-roster')

urlpatterns = [
    path('', include(router.urls)),
]
