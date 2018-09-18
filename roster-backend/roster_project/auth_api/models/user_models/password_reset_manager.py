from django.db import models
import datetime
import pytz


class PasswordResetManager(models.Manager):

    """
    Manager class for Password Reset

    """

    def is_record_expired(self, token):

        created_date = super().get_queryset().filter(token=token).created_date
        utc_now = (datetime.datetime.utcnow()).replace(tzinfo=pytz.UTC)

        is_expired = False
        if created_date < utc_now - datetime.timedelta(hours=10):
            is_expired = True

        return is_expired

    def is_record_existing(self, user):
        return super().get_queryset().filter(user=user).exist()

    def get_user_record(self, user):
        return super().get_queryset().filter(user=user)

    def insert_new_token(self, user):
        """
        Method to insert new record

        """

        if(self.is_record_existing(user=user)):
            token = self.get_user_record(user=user).token
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

    def delete_record(self, token):
        """
            Methd to delete record for a particular token
        """
        super().get_queryset().filter(token=token).delete();
