from django.db import models

import uuid

from . import user_profile_model
from .password_reset_manager import PasswordResetManager


class PasswordResetModel(models.Model):

    # Denotes the token for the user
    token = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    # User deatils
    user = models.ForeignKey(
                                user_profile_model.UserProfileModel,
                                on_delete=models.CASCADE,
                                related_name='user_rosters'
                            )

    # Insertion date
    created_date = models.DateTimeField(auto_now_add=True, blank=True)

    objects = PasswordResetManager()

    def __str__(self):

        return self.token + "--->" + self.user
