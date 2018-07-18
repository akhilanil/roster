from typing import Dict, List
import datetime
from roster_api.services.model_service import model_init_service

from .session_date_model_helper import SessionDateModelHelper


class ParticipantModelHelper():
    """ Class encapsulating methods which handles the operations on
    participants models  """

    @classmethod
    def create_participant_models(
        self,
        participants: List[Dict[str, List[Dict[datetime.date, List[str]]]]],
        sessions_list: List[str]
    ):
        """ Method to create List of participant models """

        participant_models = []

        ParticipantModel = \
            model_init_service.ModelService.get_participant_model_class()

        for participant in participants:

            user_name = participant.get("name", "")
            session_dates = SessionDateModelHelper.create_session_date_models(
                                        participant.get("leaveSessions"))
            session_conut_dict = \
                ParticipantModelHelper.create_session_conut_dict(sessions_list)
            work_sessions_list = []
            participant_model = ParticipantModel(
                user_name, session_dates, session_conut_dict, work_sessions_list)
            
            participant_models.append(participant_model)

        return participant_models

    @classmethod
    def create_session_conut_dict(self, sessions_list: List[str]):
        """ This method creates a dict which can be used to initialize
            session_count in participants"""

        session_conut_dict = {}
        for session_name in sessions_list:
            session_conut_dict[session_name] = 0
        return session_conut_dict
