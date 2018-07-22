from django.db import models

from roster_api.exceptions.roster_exceptions import save_roster_exception


class UserRosterDetailsManager(models.Manager):

    """
        Manger class for User Roster Deatils
    """

    def create_user_roster_details(
                                    self,
                                    participant_name,
                                    participant_dates,
                                    per_session_count,
                                    user_roster_deatils
                                    ):
        """
        Method to create user roster details
        """

        if not participant_name or not participant_dates \
                or not per_session_count:
            raise ValueError(save_roster_exception.REQUIRED_DATA_MISSING)
        else:
            participant = \
                self.model(participant_name=participant_name,
                           participant_dates=participant_dates,
                           per_session_count=per_session_count,
                           user_roster_deatils=user_roster_deatils)
            participant.save(using=self._db)

            return participant
