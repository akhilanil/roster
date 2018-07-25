from django.db import models
from django.db.models import Model
from .managers.user_roster_manager import UserRosterManager

import uuid


class UserRosterModel(Model):
    """ Model to define user roster for a particular user """

    # Denotes the unique Id of the user ID generated for the particular month
    unique_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    # Denotes the username
    user_name = models.CharField(max_length=30)

    # Denotes the month for which the roster is made of
    month = models.CharField(max_length=15)

    # Denotes the year for which the roster is made of
    year = models.IntegerField(default=0)

    # Denotes the title of the roster
    title = models.CharField(max_length=30, default='Untitled')

    objects = UserRosterManager()

    class Meta:
        unique_together = ('user_name', 'month', 'year', 'title', )

    def __str__(self):
        return (str(self.unique_id) + " -> " + self.user_name)
