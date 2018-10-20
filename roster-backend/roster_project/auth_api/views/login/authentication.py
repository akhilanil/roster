import datetime

from django.conf import settings
from rest_framework.authentication import TokenAuthentication
from rest_framework import exceptions
import pytz
from django.conf import settings

class ExpiringTokenAuthentication(TokenAuthentication):
    def authenticate_credentials(self, key):
        model = self.get_model()
        try:
            token = model.objects.select_related('user').get(key=key)
        except model.DoesNotExist:
            raise exceptions.AuthenticationFailed(('Invalid token.'))

        if not token.user.is_active:
            raise exceptions.AuthenticationFailed('User inactive or deleted')

        utc_now = (datetime.datetime.utcnow()).replace(tzinfo=pytz.UTC)

        if token.created < utc_now - datetime.timedelta(hours=settings.TOKEN_EXPIRATION_HOUR):
            raise exceptions.AuthenticationFailed('Token has expired')

        return (token.user, token)
