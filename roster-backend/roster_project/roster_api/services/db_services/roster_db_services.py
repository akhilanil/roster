
class RosterDBServices():

    def insert_user_roster(self, unique_id, user_name, month, year, title):
        return self.get_UserRosterModel_import().objects.create_user_roster(
                                            unique_id, user_name, month, year, title)

    def insert_user_roster_deatils(
                                self,
                                participant_name,
                                participant_dates_session,
                                per_session_count,
                                user_roster
    ):
        return self.get_UserRosterDetailsModel_import().objects.create_user_roster_details(
            participant_name, participant_dates_session,
            per_session_count, user_roster
            )


    def get_UserRosterModel_import():
        from roster_api.models.user_roster_deatils_model import UserRosterModel
        return UserRosterModel

    def get_UserRosterDetailsModel_import():
        from roster_api.models.user_roster_model import UserRosterDetailsModel
        return UserRosterDetailsModel
