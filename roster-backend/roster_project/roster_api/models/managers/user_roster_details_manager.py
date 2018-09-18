from django.db import models
from django.db import IntegrityError

import traceback

from roster_api.exceptions.roster_exceptions.save_roster_exception import \
    DuplicateRecordError, RequiredDataError


class UserRosterDetailsManager(models.Manager):

    """
        Manger class for User Roster Deatils
    """

    def create_user_roster_details(
                                    self,
                                    participant_name,
                                    participant_dates,
                                    per_session_count,
                                    user_roster
                                    ):
        """
        Method to create user roster details
        """

        if not participant_name or not participant_dates \
                or not per_session_count:
            raise RequiredDataError(traceback.format_exc())
        else:
            try:
                participant = \
                    self.model(participant_name=participant_name,
                               participant_dates=participant_dates,
                               per_session_count=per_session_count,
                               user_roster=user_roster)
                participant.save(using=self._db)
            except IntegrityError:
                raise DuplicateRecordError(traceback.format_exc())

            return participant
