import calendar

from types import List

from . import datetime


class CalendarHelper():

    @classmethod
    def getNumberOfDaysInMonth(month, year):
        """Method to get the number of days in month"""

        return calendar.monthrange(year, month)[1]

    @classmethod
    def getNumberOfParticularDayInMonth(day, month, year):
        """ Method to get the number occurence of a particular day in a month.
            The parmeter day must be a number indicating the position of the
            day in week. Positioning starts from monday with value 0. Month and
            year mustbe passed as numbers """

        day_month_list = calendar.monthcalendar(year, month)
        day_count = 0
        for day_week_list in day_month_list:
            day_count += len(list(filter(
                lambda args: args[0] == day and args[1] != 0,
                enumerate(day_week_list))))

        return day_count

    @classmethod
    def calculateInvalidSaturdays(saturdays_list, total_saturdays):
        """ Method to get the number of invalid saturday based on
            saturdays_list.<br>Parameter saturdays_list contains list of
            boolean indicating whether that saturday of week is to be
            considered """

        return total_saturdays - len(list(filter(
        lambda is_required_saturday: is_required_saturday == True, saturdays_list)))

    @classmethod
    def get_day_list_of_month(year: int, month: int, day: int) -> List[datetime.date]:

        """ Method to get the list of particular day of a month """

        saturdays_tuple = []
        day_month_list = calendar.monthcalendar(year, month)
        for day_week_list in day_month_list:
            sat = list(filter(
                    lambda args: args[0] == day
                        and args[1] != 0, enumerate(day_week_list)))

            if(len(sat) == 1):
                saturdays_tuple.extend(sat)

        saturdays_list = [datetime.date(year, month, day[1])
                                            for day in saturdays_tuple]

        return saturdays_list

    @classmethod
    def get_days_of_month(year: int, month: int) -> List[datetime.date]:
        num_days = calendar.monthrange(year, month)[1]
        days = [datetime.date(year, month, day) for day in range(1, num_days+1)]
        return days
