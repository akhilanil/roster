
from roster_api.utils.helpers.general_helpers import calendar_helpers
import datetime

from roster_api.services.model_service import model_init_service
from roster_api.utils.helpers.core_helpers.prepare_roster import PrepareRoster

from typing import List

from calendar import SUNDAY, SATURDAY


class CreateRosterHelper():
    """ Class containing helper methods to create Roster.  """

    @classmethod
    def prepare_roster(
        self,
        participants: List[model_init_service.ModelService.get_participant_model_class],
        holiday_list: List[datetime.date],
        saturday_list: List[bool],
        is_sunday_included: bool,
        session_list: List[str],
        year: int,
        month: int,
        algo_name: str
    ):
        """ Method to get the list containig number of sessions for each
        participants and the remaining days to be catered. The return value
        would be as follows<br>

        """

        CalendarHelper = calendar_helpers.CalendarHelper

        # To hold the number of participants
        number_of_participants = len(participants)



        # TODO : Validate wheter equal_divide_days is not equal to zero

        # Get the dates of the month as list
        dates_of_month = CalendarHelper.get_days_of_month(year, month)

        # Get the list of saturdays
        list_of_saturdays = CalendarHelper.get_day_list_of_month(
                                                year, month, SATURDAY)

        # Find the saturdays to be excluded
        list_invalid_saturdays = []
        for index, is_valid_sat in enumerate(saturday_list):
            if not is_valid_sat:
                list_invalid_saturdays.append(list_of_saturdays[index])


        # This list contains all the dates that are to be removed from
        # dates_of_month
        list_of_days_to_remove = []
        list_of_days_to_remove.extend(holiday_list)
        list_of_days_to_remove.extend(list_invalid_saturdays)
        if not is_sunday_included:
            list_of_sundays = CalendarHelper.get_day_list_of_month(
                                                    year, month, SUNDAY)
            list_of_days_to_remove.extend(list_of_sundays)

        # Removing the list_of_days_to_remove from dates_of_month to get The
        # valid days
        valid_dates = [
            dates for dates in dates_of_month if dates not in
            list_of_days_to_remove
        ]

        number_of_days = len(valid_dates)

        # To hold the number of days that can be equally divided among participants.
        equal_divide_days = int(number_of_days / number_of_participants)
        print("---------------->",number_of_days,equal_divide_days)
        # To hold the number of sessions
        #equal_divide_session = equal_divide_days * len(session_list)

        equal_divide_session = equal_divide_days
        # Calculate the remaining days
        remaining_days = number_of_days % number_of_participants

        remaining_dates = []
        if remaining_days:
            remaining_dates = valid_dates[(remaining_days * -1):]

            valid_dates = valid_dates[:(remaining_days * -1)]

        valid_session_dates = CreateRosterHelper.prepare_month_date_session(
                                    valid_dates, session_list)

        remaining_session_dates = CreateRosterHelper.prepare_month_date_session(
                                    remaining_dates, session_list)

        [setattr(participant, '_remaining_days', equal_divide_days * len(session_list))
                                    for participant in participants]

        # import pdb;
        # pdb.set_trace()
        # Argument list which is to be passed to the algrithm
        args = {
                "participants": participants,
                "session_date_dict": valid_session_dates
                }


        prepare_roster = PrepareRoster()
        return prepare_roster.creatae_roster_skelton(
                participants, valid_session_dates, equal_divide_session,
                remaining_session_dates, algo_name, args)

    @classmethod
    def prepare_month_date_session(self, dates: datetime, session_list: List[str]):
        """ This method creates a Dict with each row containig a List
        representing a particualar session"""

        SessionDateModel = model_init_service.ModelService.get_date_session_model_class()

        session_date_dict = {}

        for session in session_list:
            session_date_dict[session] = [SessionDateModel(session, date) for date in dates]

        return session_date_dict
