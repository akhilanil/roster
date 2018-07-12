import calendar


def getNumberOfDaysInMonth(month, year):
    """Method to get the number of days in month"""

    return calendar.monthrange(year, month)[1]


def getNumberOfParticularDayInMonth(day, month, year):
    """ Method to get the number occurence of a particular day in a month.
        The parmeter day must be a number indicating the position of the day in
        week. Positioning starts from monday with value 0. Month and year must
        be passed as numbers """

    day_month_list = calendar.monthcalendar(year, month)
    day_count = 0
    for day_week_list in day_month_list:
        day_count += len(list(filter(
            lambda args: args[0] == day and args[1] != 0,
            enumerate(day_week_list))))

    return day_count


def calculateInvalidSaturdays(saturdays_list, total_saturdays):
    """ Method to get the number of invalid saturday based on saturdays_list.
        <br>Parameter saturdays_list contains list of boolean indicating whether
        that saturday of week is to be cnsidered """
    return total_saturdays - len(list(filter(
    lambda is_required_saturday: is_required_saturday == True, saturdays_list)))


class CreateRosterHelper():
    """ Class containing helper methods to create Roster.  """

    total_sundays = 0
    total_saturdays = 0

    def sessionForEachParticipant(
        number_of_days,
        number_of_sessions_each_day,
        number_of_participants,
        participants
    ):
        """ Method to get the list containig number of sessions for each
        participants and the remaining days to be catered. The return value
        would be as follows<br>

        [2,[{"name":"","leave_dates":[],""}]]



        """


        date_meta_data = [];

        # To hold the number of days that can be equally divided among participants.
        equal_divide_days = number_of_days / number_of_participants

        # TODO : Validate wheter equal_divide_days is not equal to zero

        # Calculate the remaining days
        remaining_days = number_of_days % number_of_participants






    def getNumerOfValidDays(
        month,
        year,
        is_sunday_included,
        saturdays_list,
        total_holidays
    ):
        """ Method to get the number of valid days. Number of valid days is
            equal to the difference between total days and sum of total sundays
            in a month, total saturdays (saurdays which can be excluded based
            on user choice) and total holidays  """

        total_sundays = 0

        total_days = getNumberOfDaysInMonth(month, year)
        # 6 indicates sunday
        if(not is_sunday_included):
            total_sundays = getNumberOfParticularDayInMonth(6, month, year)

        # 5 indicate saturday
        total_saturdays_in_month = getNumberOfParticularDayInMonth(
            5, month, year)

        total_invalid_saturdays = calculateInvalidSaturdays(
            saturdays_list, total_saturdays_in_month)

        total_number_of_valid_days = total_days - total_sundays - \
            total_invalid_saturdays - total_holidays

        return total_number_of_valid_days
