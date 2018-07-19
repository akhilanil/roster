from typing import Dict, List
from roster_api.services.model_service.model_init_service import ModelService


class SequenceRosterAlgorithm():

    # The number of sessions each day should not be greater than the number of
    # participant

    @classmethod
    def set_work_list(
        self,
        participants: List[ModelService.get_participant_model_class()],
        session_date_dict: Dict,
    ):
        """ This method implements the algorithm """

        # Stores the gap needed between two days
        total_participants = len(participants)

        for session_name, date_session_list in session_date_dict.items():
            # Stores the index of the first  participant to be
            # selected  in the list.
            first_participant_index = 0
            for session in date_session_list:

                current_participant_index = first_participant_index
                # Getting the participant to which the session is to be added
                current_participant = participants[current_participant_index]

                # Appending the session to work_sessions
                current_participant.work_sessions.append(session)
                current_participant.session_count[session_name] += 1

                current_participant_index = \
                    SequenceRosterAlgorithm.__get_next_index(
                        total_participants, first_participant_index)

        first_participant_index = \
            SequenceRosterAlgorithm.__get_start_index(
                total_participants, current_participant_index)

    @classmethod
    def __get_next_index(total_participants: int, current_index: int):
        """ This method gives the index of next participant to be selected in
            participants list"""

        next_index = current_index + 1
        if next_index == total_participants:
            next_index = 0
        return next_index

    @classmethod
    def __get_start_index(total_participants: int, current_start_index: int):
        """ This method gives the starting index of participant
            for each list"""

        next_start_index = current_start_index - 1
        if next_start_index <= 0:
            next_start_index = total_participants - 1

        return next_start_index
