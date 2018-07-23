from abc import ABCMeta, abstractmethod


class AbstractRosterException():

    __metaclass__ = ABCMeta

    def get_error_code(self):
        return self.error_code

    def get_error_value(self):
        return self.error_value

    def get_error_trace(self):
        return self.error_trace

    @abstractmethod
    def get_error_dict(self): raise NotImplementedError
