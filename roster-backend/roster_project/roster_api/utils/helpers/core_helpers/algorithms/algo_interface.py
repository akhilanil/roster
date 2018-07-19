from .core_algo import sequence_roster

from typing import Dict


class AlgorithInterface():

    def get_algo_interface_class(self, algo_name: str, args_dict: Dict):
        """ This method serves as the interface method for the getting
            the algorithm class specified by the algo_name  """

        interface_method_name = "interface_class_" + algo_name

        method = getattr(self, interface_method_name)
        method(args_dict)

    def __interface_class_SEQUENCE_ROSTER_ALGORITHM(self, args_dict: Dict):
        participant_arg = args_dict.get("participants", None)
        session_dict_args = args_dict.get("session_date_dict", None)
        sequence_roster.SequenceRosterAlgorithm.set_work_list(
            participant_arg, session_dict_args)
