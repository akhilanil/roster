from roster_api.services.model_service.model_init_service import ModelService
from .prepare_roster_helper import PrepareRosterHelper
from typing import List


class PrepareRoster():

    def creatae_roster_skelton(
        self,
        participant_details: List[ModelService.get_participant_model_class()],
        month_dates_sessions: List[ModelService.get_date_session_model_class()],
        total_equal_sessions: int,
        remaining_dates_sessions: List[ModelService.get_date_session_model_class()]
    ) -> List:
        """ This method divides the working days among the participants """

        start_index = 0
        last_index = total_equal_sessions

        equal_dates_sessions_remaining = []

        # This for loop assign working days for each participant by considering
        # the leave date of the participant

        for participant in participant_details:

            sliced_month_list = PrepareRosterHelper.convert_dict_to_list(
                month_dates_sessions, start_index, last_index)
            leave_dates = participant._leave_dates
            PrepareRosterHelper.assign_work_for_participant(
                participant, leave_dates, sliced_month_list
            )
            equal_dates_sessions_remaining.extend(leave_dates)
            start_index += total_equal_sessions
            last_index += total_equal_sessions
            participant._total_working_sessions = len(participant._work_sessions)
            participant._remaining_days = \
                total_equal_sessions - participant._total_working_sessions


        import pdb; pdb.set_trace()
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
                if participant._remaining_days:

                    for key in sorted(participant._session_count):

                        equal_date_remaining = equal_dates_sessions_remaining[key]
                        temp_equal_date_remaining = []
                        for date in equal_date_remaining:
                            pdb.set_trace()
                            if not participant.is_date_already_assigned(date) \
                                    and participant._remaining_days:
                                participant._work_sessions.append(date)
                                participant._session_count[date._session_name] += 1
                                participant._remaining_days -= 1
                                participant._total_working_sessions += 1
                            else:
                                temp_equal_date_remaining.append(date)
                        equal_dates_sessions_remaining[key] = \
                            temp_equal_date_remaining

        # At this point working days are divided equally among the participants
        # in best possible manner. The Remaining dates are given to
        # participants arbitrarily.
        pdb.set_trace()
        if equal_dates_sessions_remaining:

            for date in equal_dates_sessions_remaining:

                participant_details.sort(
                    key=lambda x: x._total_working_sessions, reverse=False)
                i = 0
                date_assigned = False
                while i < len(participant_details) and not date_assigned:
                    participant = participant_details[i]
                    if not participant.is_date_already_assigned(date):
                        participant._work_sessions.append(date)
                        participant._total_working_sessions += 1
                        date_assigned = True

                    i += 1

        if equal_dates_sessions_remaining:
            print("still remaining")
        return participant_details
