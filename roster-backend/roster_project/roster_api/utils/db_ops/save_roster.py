
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

        user_roster = self.roster_db_services.insert_user_roster(
            unique_id,
            user_name,
            month,
            year,
            title
        )

        all_participants = participants['participants']

        for participant in all_participants:
            name = participant['name']
            work = participant['work']
            sessions = participant['sessions']

            self.roster_db_services.insert_user_roster_deatils(
                name,
                work,
                sessions,
                user_roster

            )
