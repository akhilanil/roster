from ...business_models import participant_model
from ...business_models import session_date_model


class ModelService():

    """ Service class for Business Models """

    @classmethod
    def get_participant_model_class(self):
        """ Method to get the <code>ParticipantModel</code> class  """

        return participant_model.ParticipantModel

    @classmethod    
    def get_date_session_model_class(self):
        """ Method to get the <code>SessionDateModel</code> class  """

        return session_date_model.SessionDateModel
