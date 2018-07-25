from django.urls import path
from django.urls import include
from rest_framework.routers import DefaultRouter
from .views import create_roster_view, get_roster_view

router = DefaultRouter()
# router.register(
#     'my-roster', create_roster_view.CreateRosterView, base_name='my-roster')

router.register(
    'view-roster', get_roster_view.GetRosterView, base_name='view-roster')

router.register(
    'new-roster', create_roster_view.CreateRosterView, base_name='new-roster')


urlpatterns = [
    path('', include(router.urls)),
]
