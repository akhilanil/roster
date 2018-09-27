from django.db import models
import datetime
import pytz

from django.core.exceptions import ObjectDoesNotExist


class PasswordResetManager(models.Manager):

    """
    Manager class for Password Reset

    """

    def is_record_expired(self, token):

        created_date = super().get_queryset().get(token=token).created_date
        utc_now = (datetime.datetime.utcnow()).replace(tzinfo=pytz.UTC)

        is_expired = False
        if created_date < utc_now - datetime.timedelta(hours=10):
            is_expired = True

        return is_expired

    def is_record_existing(self, user=None, token=None):

        if user is not None:
            try:
                super().get_queryset().get(user=user)
            except ObjectDoesNotExist:
                return False
            return True
        elif token is not None:
            try:
                super().get_queryset().get(token=token)
            except ObjectDoesNotExist:
                return False
            return True
        else:
            return False

    def get_user_record(self, user=None, token=None):
        if user is not None:
            return super().get_queryset().filter(user=user)
        elif token is not None:
            return super().get_queryset().filter(token=token)

    def insert_new_token(self, user):
        """
        Method to insert new record

        """

        if(self.is_record_existing(user=user)):
            token = self.get_user_record(user=user)[0].token
            print("----------------->",token)
            if(self.is_record_expired(token)):
                self.delete_record(token)
                new_request = self.model(user=user)
                new_request.save(using=self._db)
                return new_request.token
            else:
                return token
        else:
            new_request = self.model(user=user)
            new_request.save(using=self._db)
            return new_request.token

    def change_pasword(self, token, new_password):
        """
        Method to change password of user.
        """

        user = super().get_queryset().filter(token=token)[0].user
        print(user,new_password, user.get_full_name())
        user.set_password(new_password)
        user.save()
        self.delete_record(token=token)

    def delete_record(self, token):
        """
            Methd to delete record for a particular token
        """
        super().get_queryset().filter(token=token).delete()
