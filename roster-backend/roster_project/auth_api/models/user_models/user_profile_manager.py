
#from django.contrib.auth.models import AbstractBaseUser
from django.contrib.auth.models import BaseUserManager
from django.contrib.auth.models import PermissionsMixin

# User defined exceptions
from ...exceptions import EMAIL_ID_REQUIRED


class UserProfileManager(BaseUserManager):
    """Model representing User manager to create normal and super user"""

    def create_user(self, email, first_name, last_name, password=None):
        """ Method to create a new user"""

        if not email:
            raise ValueError(EMAIL_ID_REQUIRED)

        # normilize is used so that domain name is in lower case
        email = self.normalize_email(email)
        user = self.model(
            email=email, last_name=last_name, first_name=first_name)
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, email, first_name, last_name, password=None):
        """ Method to create a new super user"""

        user = self.create_user(email, first_name, last_name, password)

        user.is_superuser = True
        user.is_staff = True

        user.save(using=self._db)

        return user
