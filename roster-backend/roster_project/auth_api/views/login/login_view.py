from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework import status

import datetime
from django.http import HttpResponse
from rest_framework.authtoken.models import Token

import json
import pytz


class LoginViewSet(ObtainAuthToken):
    """ Authenticates user and returns AuthToken """

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            print(serializer.validated_data['user'])
            token, created = Token.objects.get_or_create(user=serializer.validated_data['user'])

            utc_now = (datetime.datetime.utcnow()).replace(tzinfo=pytz.UTC);

            if not created and token.created < utc_now - datetime.timedelta(hours=1):
                token.delete()
                token = Token.objects.create(user=serializer.validated_data['user'])
                token.created = datetime.datetime.utcnow()
                token.save()

            response_data = {'token': token.key}
            return HttpResponse(json.dumps(response_data), content_type="application/json")

        print(serializer.errors)
        return HttpResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
