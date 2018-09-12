import datetime

from rest_framework.authentication import TokenAuthentication
from rest_framework import exceptions
import pytz


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

        if token.created < utc_now - datetime.timedelta(minutes=1):
            raise exceptions.AuthenticationFailed('Token has expired')

        return (token.user, token)
