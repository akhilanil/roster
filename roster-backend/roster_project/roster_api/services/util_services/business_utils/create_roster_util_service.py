from roster_api.utils.business_utils import create_roster
from typing import List


class CreateRosterUtilService():

    def __init__(self):
        self._create_roster_util = None

    def __initialize_create_util_obj(self) -> create_roster.CreateRosterUtil:
        if(self._create_roster_util is None):
            self._create_roster_util = create_roster.CreateRosterUtil()

    def prepare_roster(self,
                       username: str,
                       participants: List,
                       holidays: List,
                       month: int,
                       year: int,
                       is_sunday_included: bool,
                       saturdays_list: List[bool],
                       sessions: List[str],
                       algo_name: str
                       ):

        self.__initialize_create_util_obj()
        return self._create_roster_util.prepare_roster(username, participants, holidays,
            month, year, is_sunday_included, saturdays_list, sessions, algo_name)
