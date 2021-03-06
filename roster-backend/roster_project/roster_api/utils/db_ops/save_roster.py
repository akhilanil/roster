from roster_api.exceptions.roster_exceptions.save_roster_exception import \
    DuplicateRecordError, RequiredDataError
from roster_api.services.db_services import roster_db_services


class RosterSave():
    """ Handles method related to saving roster  """

    def __init__(self):
        self.roster_db_services = None

    def init_roster_db_services(self):
        self.roster_db_services = roster_db_services.RosterDBServices()

    def handle_save_roster(self, participants):

        self.init_roster_db_services()

        unique_id = participants['id']
        user_name = participants['user_name']
        month = participants['month']
        year = participants['year']
        title = participants['title']

        try:
            user_roster = self.roster_db_services.insert_user_roster(
                unique_id, user_name, month, year, title)
        except DuplicateRecordError as duplicate_error:
            raise duplicate_error
        except RequiredDataError as required_data_error:
            raise required_data_error

        all_participants = participants['user_rosters']

        for participant in all_participants:
            name = participant['participant_name']
            work = participant['participant_dates']
            sessions = participant['per_session_count']

            try:
                self.roster_db_services.insert_user_roster_deatils(
                    name, work, sessions, user_roster)
            except DuplicateRecordError as duplicate_error:
                raise duplicate_error
            except RequiredDataError as required_data_error:
                raise required_data_error

        return user_roster.unique_id
