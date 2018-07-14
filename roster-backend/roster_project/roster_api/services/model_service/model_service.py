from ...business_models import ParticipantModel
from ...business_models import SessionDateModel

class ModelService():

    """ Service class for Business Models """

    @classmethod
    def get_participant_model_class():
        """ Method to get the <code>ParticipantModel</code> class  """

        return ParticipantModel

    def get_date_session_model_class():
        """ Method to get the <code>SessionDateModel</code> class  """

        return SessionDateModel
