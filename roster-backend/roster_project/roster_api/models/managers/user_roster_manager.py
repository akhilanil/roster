from django.db import models

from roster_api.exceptions.roster_exceptions import save_roster_exception

from django.db import IntegrityError

import traceback

from roster_api.exceptions.roster_exceptions.save_roster_exception import DuplicateRecordError
from roster_api.exceptions.roster_exceptions.save_roster_exception import UnexpectedDBError
from roster_api.exceptions.roster_exceptions.save_roster_exception import RequiredDataError


class UserRosterManager(models.Manager):

    """
        Manger class for User Roster Deatils
    """

    def create_user_roster(self, unique_id, user_name, month, year, title):
        """
        Method to create user roster details
        """

        if not id:
            raise RequiredDataError("", save_roster_exception.UNIQUE_ID_REQUIRED)
        elif not month or not year or not title:
            raise ValueError(save_roster_exception.REQUIRED_DATA_MISSING)
        else:
            # import pdb; pdb.set_trace()
            try:
                user = \
                    self.model(
                            unique_id=unique_id,
                            user_name=str(user_name),
                            month=month,
                            year=year,
                            title=title
                    )

                user.save(using=self._db)
            except IntegrityError:
                raise DuplicateRecordError(traceback.format_exc())
            except Exception:
                raise UnexpectedDBError(traceback.format_exc())

            return user

    def delete_user_roster(self, unique_id):
        """
        Method to delete user roster details
        """

        if not unique_id:
            raise ValueError(save_roster_exception.UNIQUE_ID_REQUIRED)
        else:
            self.model.objects.filter(id=unique_id).delete()
