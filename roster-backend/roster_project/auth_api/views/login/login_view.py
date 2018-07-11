from rest_framework import viewsets

from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.authtoken.views import ObtainAuthToken


class LoginViewSet(viewsets.ViewSet):
    """ Authenticates user and returns AuthToken """

    serializer_class = AuthTokenSerializer

    def create(self, request):
        """ HTTP POST Method to validate user name and password and
                return the Auth token"""
        return ObtainAuthToken.post(self, request)
