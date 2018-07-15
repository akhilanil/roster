from roster_api.utils.business_utils import create_roster


class CreateRosterUtilService():

    create_roster_util = None

    @classmethod
    def get_create_util_obj(self):
        if(self.create_roster_util is None):
            self.create_roster_util = create_roster.CreateRosterUtil()
        return self.create_roster_util
