from roster_api.utils.helpers.business_helpers import create_roster_helper
from roster_api.utils.helpers.business_helpers.model_helpers import participant_model_helper
from roster_api.utils.helpers.general_helpers.calendar_helpers import CalendarHelper

from typing import List


class CreateRosterUtil():

    def prepare_roster(
        self,
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
        """ Fucntion to handle roster creation.<br>
            <ul>
                <li><code>username</code> Holds the user name of the user</li>
                <li><code>participants</code> Should be list of dictionaries.
                Each dictionary object should conatin the name of the
                participant and list of the dates in which that particular
                participant would be taking leave</li>
                <li><code>holidays</code> Should be a list of dates indicating
                the holidays of the particular month. Length of this list will
                 be used to calculate the number of holidays for the month</li>
                <li><code>month</code> Should be an integer value holding the
                month for which the roster is to be created </li>
                <li><code>year</code> Should be an integer value holding the
                 year for which the roster is to be created </li>
                <li><code>is_sunday_included</code> Boolean value indicating
                whether sunday is to be considered as holiday</li>
                <li><code>saturdays_list</code> List of Boolean values
                indicating whther saturday of a particular week is to be
                considered as working day. Index of the list will be considered
                as week number</li>
                <li><code>sessions</code> List of string representing the name
                of each session. Length of this list will be used to calculate
                the number of sessions in days</li>
            </ul>

             """

        roster_for_participants = \
            participant_model_helper.ParticipantModelHelper.create_participant_models(
                        participants, sessions)

        holiday_list = CalendarHelper.convert_str_list_to_date(holidays)

        return create_roster_helper.CreateRosterHelper.prepare_roster(
            roster_for_participants, holiday_list, saturdays_list,
            is_sunday_included, sessions, year, month, algo_name
        )
