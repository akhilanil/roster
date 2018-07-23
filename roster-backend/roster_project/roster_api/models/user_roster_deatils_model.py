from . import models
from . import user_roster_model
from .managers.user_roster_details_manager import UserRosterDetailsManager




class UserRosterDetailsModel(models.Model):
    """ Model to define details of user_roster_model """

    # Denotes the participant name
    participant_name = models.CharField(max_length=30)

    # String denoting the dates in which the participant is assigned the
    # jobself. The dates are comma seperated. Only the date is stored the
    # month and year are excluded.
    participant_dates = models.CharField(max_length=500)

    # String denoting the count of each session assigned to the participant. The
    # sessions are comma seperated.
    per_session_count = models.CharField(max_length=100)

    # User Roster Details
    user_roster = models.ForeignKey(
                                user_roster_model.UserRosterModel,
                                on_delete=models.CASCADE
                            )

    objects = UserRosterDetailsManager()

    def __str__(self):
        return self.participant_name
