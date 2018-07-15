from typing import List, Dict
import datetime
from roster_api.services.model_service import model_init_service


class SessionDateModelHelper():

    """ Class encapsulating methods which handles the operations on
    session date models  """

    @classmethod
    def create_session_date_models(
        session_dates: List[Dict[datetime.date, List[str]]]) -> List[model_init_service.ModelService.get_date_session_model_class()]:
        """ Method to create list of Session Date models """

        SessionDateModelClass = model_init_service.ModelService.get_date_session_model_class()

        session_dates_models = []
        for session_date in session_dates:
            leave_date = session_date.get("leaveDate")
            session_names = session_date.get("sessionNames")
            for session_name in session_names:
                session_date_model = SessionDateModelClass(session_name, leave_date)
                session_dates_models.append(session_date_model)

        return session_dates_models
