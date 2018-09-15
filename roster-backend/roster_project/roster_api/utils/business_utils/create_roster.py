from roster_api.utils.helpers.business_helpers import create_roster_helper
from roster_api.utils.helpers.business_helpers.model_helpers import participant_model_helper

from roster_api.utils.helpers.general_helpers.calendar_helpers import CalendarHelper

from roster_api.utils.general_utils.unique_key import UniqueKeyUtil

from ..db_ops import save_roster

from roster_api.exceptions.roster_exceptions.save_roster_exception import DuplicateRecordError,RequiredDataError

from typing import List


class CreateRosterUtil():

    def __init__(self):
        self.save_roster = None

    def init_save_roster(self):
            if not self.save_roster:
                self.save_roster = save_roster.RosterSave()

    def convert_participant_for_view(self, participants):

        participants_list = []
        for participant in participants:
            participant_dict = {}
            participant_dict['participant_name'] = participant.name
            work = ""
            for work_session in participant.work_sessions:
                work = work + work_session.session_name + ":" + \
                                    str(work_session.date.day)+","
            participant_dict['participant_dates'] = work
            session = ""
            for key, val in participant.session_count.items():
                session = session + key + ":" + str(val) + ","
            participant_dict['per_session_count'] = session
            participants_list.append(participant_dict)
        return participants_list

    def convert_for_client(self, unique_id, user_name, month, year, title, participants):

        participant_dict = {}

        if unique_id:
            participant_dict['id'] = unique_id

        participant_dict['user_name'] = user_name

        participant_dict['month'] = month

        participant_dict['year'] = year

        participant_dict['title'] = title

        participant_dict['user_rosters'] = self.convert_participant_for_view(participants)

        return participant_dict

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
        algo_name: str,
        title: str

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

        participants = create_roster_helper.CreateRosterHelper.prepare_roster(
            roster_for_participants, holiday_list, saturdays_list,
            is_sunday_included, sessions, year, month, algo_name
        )

        _unique_key = None
        if username is not None:

            # Generate the hash and store in DB and pass the hash value to view
            _unique_key = UniqueKeyUtil.generate_unique_key()

            self.init_save_roster()

            try:
                _unique_key = self.save_roster.handle_save_roster(
                    self.convert_for_client(
                        _unique_key, username, month, year, title, participants))
            except DuplicateRecordError as duplicate_error:
                raise duplicate_error
            except RequiredDataError as required_data_error:
                raise required_data_error

            return _unique_key
        else:

            return self.convert_for_client(
                _unique_key, username, month, year, title, participants)
