from typing import List

from .session_date_model import SessionDateModel
import datetime


class ParticipantModel():

    def __init__(self,
                 name: str = None,
                 leave_dates: List[SessionDateModel] = None,
                 work_sessions: List[SessionDateModel] = None,
                 remaining_days: int = 0,
                 total_working_sessions: int = 0
                 ):

        # To hold the name of Participant
        self._name = name
        # To hold the list days in which the participant is on leave
        self._leave_dates = leave_dates
        # To hold the list days assigned for the participant
        self._work_sessions = work_sessions
        # To hold the number of days remaining days to be assigned.
        self._remaining_days = remaining_days
        # To hold the number of working days assigned
        self._total_working_sessions = total_working_sessions

    def is_date_already_assigned(self, session_date: SessionDateModel):
        """ Method to check whether the participant is asigned with the
            given date """

        for session_date in self.leave_dates:
            if session_date._date == session_date._date:
                return True

    def __str__(self):
        return "Participants : Name:{} Work:{} Total:{} ".format(
            self._name, self._work_sessions[0].__str__(), self._total_working_sessions)

    # Property for name
    @property
    def name(self):
        return self._name

    @name.setter
    def name(self, name):
        self._name = name

    @name.deleter
    def name(self):
        del self._name

    # Property for Leave dates
    @property
    def leave_dates(self):
        return self._leave_dates

    @leave_dates.setter
    def leave_dates(self, leave_dates):
        self._leave_dates = leave_dates

    @leave_dates.deleter
    def leave_dates(self):
        del self._leave_dates

    # Property for Work dates
    @property
    def work_sessions(self):
        return self._work_sessions

    @work_sessions.setter
    def work_sessions(self, work_sessions):
        self._work_sessions = work_sessions

    @work_sessions.deleter
    def work_sessions(self):
        del self._work_sessions

    # Property for remaining dates
    @property
    def remaining_days(self):
        return self._remaining_days

    @remaining_days.setter
    def remaining_days(self, remaining_days):
        self._remaining_days = remaining_days

    @remaining_days.deleter
    def remaining_days(self):
        del self._remaining_days

    # Property for total working dates
    @property
    def total_working_sessions(self):
        return self._total_working_sessions

    @total_working_sessions.setter
    def total_working_sessions(self, total_working_sessions):
        self._total_working_sessions = total_working_sessions

    @total_working_sessions.deleter
    def total_working_sessions(self):
        del self._total_working_sessions
