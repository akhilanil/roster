
import datetime


class SessionDateModel():

    def __init__(self, session_name: str = None, date: datetime.date = None):
        self._session_name = session_name
        self._date = date

    def __eq__(self, session_date_model):
        return self._session_name == session_date_model._session_name and \
                self.date == session_date_model.date

    def __str__(self):
        return "Session Name: {} Date : {}".format(
                self.session_name, self.date)

    # Property for session_name
    @property
    def session_name(self):
        return self._session_name

    @session_name.setter
    def session_name(self, session_name):
        self._session_name = session_name

    @session_name.deleter
    def session_name(self):
        del self._session_name

    # Property for date
    @property
    def date(self):
        return self._date

    @date.setter
    def date(self, date):
        self._date = date

    @date.deleter
    def date(self):
        del self._date
