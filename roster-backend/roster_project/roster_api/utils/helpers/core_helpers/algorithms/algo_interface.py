from .core_algo import sequence_roster

from typing import Dict


class AlgorithInterface():

    def __init__(self):
        self.common_method_name = "algo_"

    def apply_algorithm(self, algo_name: str, args_dict: Dict):
        """ This method serves as the interface method for the getting
            the algorithm class specified by the algo_name  """

        interface_method_name = self.common_method_name + algo_name.lower()

        method = getattr(self, interface_method_name)
        return method(args_dict)

    def algo_sequence_roster_algorithm(self, args_dict: Dict):
        participant_arg = args_dict.get("participants", None)
        session_dict_args = args_dict.get("session_date_dict", None)
        return sequence_roster.SequenceRosterAlgorithm.set_work_list(
            participant_arg, session_dict_args)
