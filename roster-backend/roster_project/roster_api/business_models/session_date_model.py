
from . import datetime


class SessionDateModel():

    def __init__(self, session_name: str = None, date: datetime.date = None):
        self.session_name = session_name
        self.date = date

    def __eq__(self, session_date_model):
        return self.session_name == session_date_model.session_name and \
                self.date == session_date_model.date

    # Property for session_name
    @property
    def session_name(self):
        return self.session_name

    @session_name.setter
    def session_name(self, session_name):
        self.session_name = session_name

    @session_name.deleter
    def session_name(self):
        del self.session_name

    # Property for date
    @property
    def date(self):
        return self.date

    @date.setter
    def date(self, date):
        self.date = date

    @date.deleter
    def date(self):
        del self.session_name
