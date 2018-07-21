from roster_api.services.model_service.model_init_service import ModelService
from .prepare_roster_helper import PrepareRosterHelper
from typing import List, Dict
from .algorithms import algo_interface


class PrepareRoster(object):

    def __init__(self):
        self._algorithm_interface = None

    def __init_algo_interface_obj(self):
        """ Method to get the object for  AlgorithInterface """

        if self._algorithm_interface is None:
            self._algorithm_interface = algo_interface.AlgorithInterface()


    def creatae_roster_skelton(
        self,
        participant_details: List[ModelService.get_participant_model_class()],
        month_dates_sessions: List[ModelService.get_date_session_model_class()],
        total_equal_sessions: int,
        remaining_dates_sessions: List[ModelService.get_date_session_model_class()],
        algo_name: str,
        algo_args: Dict
    ) :
        """ This method divides the working days among the participants """

        equal_dates_sessions_remaining = []

        # This for loop assign working days for each participant by considering
        # the leave date of the participant

        self.__init_algo_interface_obj()
        equal_dates_sessions_remaining = \
            self._algorithm_interface.apply_algorithm(algo_name, algo_args)


        equal_dates_sessions_remaining = PrepareRosterHelper.add_list_to_dict(
            remaining_dates_sessions, equal_dates_sessions_remaining
        )

        # equal_dates_sessions_remaining.extend(remaining_dates_sessions)


        # This for loop assigns the reamining working days by considering
        # the leave date of the participanat

        for participant in participant_details:
            # Checkin the list is empty. If not more dates are yet to be assigned.
            if equal_dates_sessions_remaining:
                # Checking if more days can be assigned to the participant.

                if participant.remaining_days:
                    for key_value_tuple in sorted(
                                participant.session_count.items(),
                                key=lambda kv: kv[1]):

                        key = key_value_tuple[0]
                        equal_date_remaining = []

                        if key in equal_dates_sessions_remaining:
                            equal_date_remaining = \
                                equal_dates_sessions_remaining[key]
                        temp_equal_date_remaining = []
                        for date in equal_date_remaining:

                            if date not in participant.leave_dates \
                                    and not participant.is_date_already_assigned(date) \
                                    and participant.remaining_days:

                                participant.work_sessions.append(date)
                                participant.session_count[date._session_name] += 1
                                participant.remaining_days -= 1
                                participant.total_working_sessions += 1

                            else:
                                temp_equal_date_remaining.append(date)
                        equal_dates_sessions_remaining[key] = \
                            temp_equal_date_remaining


        # At this point working days are divided equally among the participants
        # in best possible manner. The Remaining dates are given to
        # participants arbitrarily.

        for key, value in equal_dates_sessions_remaining.items():
            for date in value:
                PrepareRosterHelper.sort_participants(participant_details, key)
                print(date)

                participant = participant_details[0]
                if date not in participant.leave_dates and not participant.is_date_already_assigned(date):
                    participant.work_sessions.append(date)
                    participant.session_count[date._session_name] += 1
                    participant.remaining_days -= 1
                    participant.total_working_sessions += 1
                else:
                    i = 1

                    while i < len(participant_details):
                        swappable_participant = participant_details[i]
                        if not swappable_participant.is_date_already_assigned(date) \
                            and date not in swappable_participant.leave_dates:
                            swappable_work_session = None
                            for work_sessions in swappable_participant.work_sessions:
                                if not participant.is_date_already_assigned(work_sessions) \
                                    and work_sessions not in participant.leave_dates:
                                        swappable_work_session = work_sessions
                                        break

                            if swappable_work_session:
                                swappable_participant.work_sessions.remove(swappable_work_session)
                                swappable_participant.work_sessions.append(date)
                                participant.work_sessions.append(swappable_work_session)
                                participant.session_count[date._session_name] += 1
                                participant.remaining_days -= 1
                                participant.total_working_sessions += 1
                                break
                        i += 1

        return participant_details
