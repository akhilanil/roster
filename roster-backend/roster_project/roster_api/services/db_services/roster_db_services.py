from roster_api.exceptions.roster_exceptions.save_roster_exception import DuplicateRecordError, RequiredDataError


class RosterDBServices():

    def insert_user_roster(self, unique_id, user_name, month, year, title):

        try:
            return self.get_UserRosterModel_import().objects.create_user_roster(
                                            unique_id, user_name, month, year, title)
        except DuplicateRecordError:
            raise DuplicateRecordError
        except RequiredDataError:
            raise RequiredDataError

    def insert_user_roster_deatils(
                                self,
                                participant_name,
                                participant_dates_session,
                                per_session_count,
                                user_roster
    ):

        try:
            return self.get_UserRosterDetailsModel_import().objects.create_user_roster_details(
                participant_name, participant_dates_session,
                per_session_count, user_roster
                )
        except DuplicateRecordError:
            raise DuplicateRecordError
        except RequiredDataError:
            raise RequiredDataError

    def get_UserRosterDetailsModel_import():

        from roster_api.models.user_roster_deatils_model import UserRosterDetailsModel
        return UserRosterDetailsModel

    def get_UserRosterModel_import():
        from roster_api.models.user_roster_model import UserRosterModel
        return UserRosterModel
