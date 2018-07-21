from typing import List, Dict
from roster_api.services.model_service.model_init_service import ModelService


class PrepareRosterHelper():
    """ Helper method to implement core business logic  """

    @classmethod
    def convert_dict_to_list(
            self, date_dict: Dict, first_index: int, last_index: int):
        """ Method to convert date_matrix to list. Each row in the matrix
            contains a List which will be sliced based on the first_index and
            last_index number . This will be appended to a list and is
            returned back """

        required_date_list = []

        for key in date_dict:
            required_date_list.extend((date_dict[key])[first_index:last_index])

        return required_date_list

    @classmethod
    def sort_participants(
            self,
            participants: List[ModelService.get_participant_model_class()],
            session_name: str
    ):
        " The method handles the logic for sorting the participant list "

        base_value = participants[0].total_working_sessions

        _is_total_work_same = \
            all(base_value == participant.total_working_sessions for participant in participants)

        if _is_total_work_same:
            participants.sort(
                key=lambda x: x.session_count[session_name], reverse=False)
        else:
            participants.sort(
                key=lambda x: x.total_working_sessions, reverse=False)

    @classmethod
    def add_list_to_dict(
        self,
        date_dict: Dict[str, List[ModelService.get_date_session_model_class()]],
        date_list: List[ModelService.get_date_session_model_class()]
    ):
        for date in date_list:
            (date_dict[date._session_name]).append(date)
        return date_dict

    @classmethod
    def assign_work_for_participant(
        self,
        participant: ModelService.get_participant_model_class(),
        leave_dates: List[ModelService.get_date_session_model_class()],
        sliced_month_list: List[ModelService.get_date_session_model_class()]
    ):

        for session_date in sliced_month_list:
            if session_date not in leave_dates:

                participant.work_sessions.append(session_date)
                participant.session_count[session_date._session_name] += 1
