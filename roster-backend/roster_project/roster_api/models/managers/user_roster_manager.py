from django.db import models

from roster_api.exceptions.roster_exceptions import save_roster_exception


class UserRosterManager(models.Manager):

    """
        Manger class for User Roster Deatils
    """

    def create_user_roster(self, unique_id, user_name, month, year, title):
        """
        Method to create user roster details
        """

        if not id:
            raise ValueError(save_roster_exception.UNIQUE_ID_REQUIRED)
        elif not month or not year or not title:
            raise ValueError(save_roster_exception.REQUIRED_DATA_MISSING)
        else:
            user = \
                self.model(
                        unique_id=unique_id,
                        user_name=user_name,
                        month=month,
                        year=year,
                        title=title
                )

            user.save(using=self._db)
            return user

    def delete_user_roster(self, unique_id):
        """
        Method to delete user roster details
        """

        if not unique_id:
            raise ValueError(save_roster_exception.UNIQUE_ID_REQUIRED)
        else:
            self.model.objects.filter(id=unique_id).delete()
