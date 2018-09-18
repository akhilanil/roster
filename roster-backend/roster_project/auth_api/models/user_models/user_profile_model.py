from django.db import models

from django.contrib.auth.models import AbstractBaseUser

from .user_profile_manager import UserProfileManager
from django.contrib.auth.models import PermissionsMixin


class UserProfileModel(AbstractBaseUser, PermissionsMixin):
    """ Model to define user profile in system """

    email = models.EmailField(max_length=255, unique=True)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserProfileManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    def get_full_name(self):
        """ Method to get user's full name """

        name = "{} {}"
        return name.format(self.first_name, self.last_name)

    def get_short_name(self):
        """ Method to get user's full name """

        return self.first_name

    def __str__(self):

        return self.email
