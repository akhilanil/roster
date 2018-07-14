from . import ModelService

from typing import List


class PrepareRoster():

    def creatae_roster_skelton(
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
        # the leave date of the participanat

        for participant in participant_details:
            sliced_month_list = month_dates_sessions[start_index:last_index]
            leave_dates = participant.leave_dates
            participant.work_sessions = [
                x for x in sliced_month_list if x not in leave_dates]
            equal_dates_sessions_remaining.extend(leave_dates)
            start_index += total_equal_sessions
            last_index += total_equal_sessions
            participant.remaining_days = len(leave_dates)
            participant.total_working_sessions = len(participant.work_sessions)

        equal_dates_sessions_remaining.extend(remaining_dates_sessions)

        # This for loop assigns the reamining working days by considering
        # the leave date of the participanat

        for participant in participant_details:
            # Checkin the list is empty. If not more dates are yet to be assigned.
            if equal_dates_sessions_remaining:
                # Checking if more days can be assigned to the participant.
                if participant.remaining_days:
                    temp_equal_dates_sessions_remaining = []
                    for date in equal_dates_sessions_remaining:
                        if not participant.is_date_already_assigned(date):
                            participant.work_sessions.extend(date)
                            participant.remaining_days -= 1
                            participant.total_working_sessions += 1
                        else:
                            temp_equal_dates_sessions_remaining.extend(date)
                    equal_dates_sessions_remaining = temp_equal_dates_sessions_remaining

        # At this point working days are divided equally among the participants
        # in best possible manner. The Remaining dates are given to
        # participants arbitrarily.

        if equal_dates_sessions_remaining:

            for date in equal_dates_sessions_remaining:

                participant_details.sort(
                    key=lambda x: x.total_working_sessions, reverse=False)
                i = 0
                date_assigned = False
                while i < len(participant_details) and not date_assigned:
                    participant = participant_details[i]
                    if not participant.is_date_already_assigned(date):
                        participant.work_sessions.extend(date)
                        participant.total_working_sessions += 1
                        date_assigned = True

                    i += 1

        if equal_dates_sessions_remaining:
            print("still remaining")
        return participant_details
