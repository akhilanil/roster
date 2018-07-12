from . import CreateRosterHelper


def prepare_roster(
    username,
    participants,
    holidays,
    month,
    year,
    is_sunday_included,
    saturdays_list,
    sessions,

):
    """ Fucntion to handle roster creation.<br>
        <ul>
            <li><code>username</code> Holds the user name of the user</li>
            <li><code>participants</code> Should be list of dictionaries. Each
            dictionary object should conatin the name of the participant and
            list of the dates in which that particular participant would be
            taking leave</li>
            <li><code>holidays</code> Should be a list of dates indicating the
            holidays of the particular month. Length of this list will be used
            to calculate the number of holidays for the month</li>
            <li><code>month</code> Should be an integer value holding the month
            for which the roster is to be created </li>
            <li><code>year</code> Should be an integer value holding the year
            for which the roster is to be created </li>
            <li><code>is_sunday_included</code> Boolean value indicating
            whether sunday is to be considered as holiday</li>
            <li><code>saturdays_list</code> List of Boolean values indicating
            whther saturday of a particular week is to be considered as working
            day. Index of the list will be considered as week number</li>
            <li><code>sessions</code> List of string representing the name of
            each session. Length of this list will be used to calculate
            the number of sessions in days</li>
        </ul>

         """

    create_roster_helper = CreateRosterHelper()
    total_holidays = len(sessions)
    total_session = len(sessions)

    valid_days = create_roster_helper.getNumerOfValidDays(
        month, year, is_sunday_included, saturdays_list, total_holidays)
