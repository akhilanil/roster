UNIQUE_ID_REQUIRED = "UNIQUE ID NOT DEFINED"

from .. import abstract_exception


class DuplicateRecordError(abstract_exception.AbstractRosterException):
    """Raised when the Duplicate Roster exist"""

    def __init__(self, error_trace, error_value="DUPLICATE RECORD EXIST", error_code=500):
        self.error_code = error_code
        self.error_value = error_value
        self.error_trace = error_trace

    def get_error_dict(self):
        error_dict = {}
        error_dict['error_code'] = self.error_code
        error_dict['error_value'] = self.error_value
        error_dict['error_trace'] = self.error_trace
        return error_dict


class RequiredDataError(abstract_exception.AbstractRosterException):

    def __init__(self, error_trace, error_value="REQUIRED DATA MISSING", error_code=500):
        self.error_code = error_code
        self.error_value = error_value
        self.error_trace = error_trace

    def get_error_dict(self):
        error_dict = {}
        error_dict['error_code'] = self.error_code
        error_dict['error_value'] = self.error_value
        error_dict['error_trace'] = self.error_trace
        return error_dict


class UnexpectedDBError(abstract_exception.AbstractRosterException):
    def __init__(self, error_trace, error_value="UNEXPECTED DB ERROR", error_code=500):
        self.error_code = error_code
        self.error_value = error_value
        self.error_trace = error_trace

    def get_error_dict(self):
        error_dict = {}
        error_dict['error_code'] = self.error_code
        error_dict['error_value'] = self.error_value
        error_dict['error_trace'] = self.error_trace
        return error_dict
