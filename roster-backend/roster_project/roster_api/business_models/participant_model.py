from typing import List

from . import SessionDateModel
from . import datetime

class ParticipantModel():

    def __init__(self,
                 name: str = None,
                 leave_dates: List[SessionDateModel] = None,
                 work_sessions: List[SessionDateModel] = None,
                 remaining_days: int = 0,
                 total_working_sessions: int = 0
                 ):

        # To hold the name of Participant
        self.name = name
        # To hold the list days in which the participant is on leave
        self.leave_dates = leave_dates
        # To hold the list days assigned for the participant
        self.work_sessions = work_sessions
        # To hold the number of days remaining days to be assigned.
        self.remaining_days = remaining_days
        # To hold the number of working days assigned
        self.total_working_sessions = total_working_sessions

    def is_date_already_assigned(self, date: datetime) -> bool:
        """ Method to check whether the participant is asigned with the
            given date """
        for session_date in self.leave_dates:
            if(session_date.date == date):
                return True


    # Property for name
    @property
    def name(self):
        return self.name

    @name.setter
    def name(self, name):
        self.name = name

    @name.deleter
    def name(self):
        del self.name

    # Property for Leave dates
    @property
    def leave_dates(self):
        return self.leave_dates

    @leave_dates.setter
    def leave_dates(self, leave_dates):
        self.leave_dates = leave_dates

    @leave_dates.deleter
    def leave_dates(self):
        del self.leave_dates

    # Property for Work dates
    def work_sessions(self):
        return self.work_sessions

    @work_sessions.setter
    def work_sessions(self, work_sessions):
        self.work_sessions = work_sessions

    @work_sessions.deleter
    def work_sessions(self):
        del self.work_sessions

    # Property for remaining dates
    def remaining_days(self):
        return self.remaining_days

    @remaining_days.setter
    def remaining_days(self, remaining_days):
        self.remaining_days = remaining_days

    @remaining_days.deleter
    def remaining_days(self):
        del self.remaining_days

    # Property for total working dates
    def total_working_sessions(self):
        return self.total_working_sessions

    @total_working_sessions.setter
    def total_working_sessions(self, total_working_sessions):
        self.total_working_sessions = total_working_sessions

    @total_working_sessions.deleter
    def total_working_sessions(self):
        del self.total_working_sessions
