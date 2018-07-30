from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from roster_api.exceptions.roster_exceptions.save_roster_exception import DuplicateRecordError,RequiredDataError


from roster_api.services.SerializerService.create_roster_service import CreateRosterSerializerService
from roster_api.services.util_services.business_utils.create_roster_util_service import CreateRosterUtilService

from django.db import transaction


class CreateRosterView(viewsets.ViewSet):

    """ Manges the roster. Handles the Creation, Updation and Display
        fucntionalities of the Roster """

    serializer_class = CreateRosterSerializerService.get_serializer_class()
    authentication_classes = (TokenAuthentication,)
    permission_classes = ()


    @transaction.atomic
    def create(self, request):

        serializer = CreateRosterSerializerService.process_request(request)
        if(serializer.is_valid()):

            participants = serializer.data.get('participants')
            holidays = serializer.data.get('holidays')
            month = serializer.data.get('rosterForMonth')
            year = serializer.data.get('rosterForYear')
            is_sunday_included = serializer.data.get('isSundayIncluded')
            saturdays_included = serializer.data.get('saturdaysIncluded')
            session_names = serializer.data.get('sessionNames')
            algo_name = serializer.data.get('algorithmUsed')
            title = serializer.data.get('title')
            user_name = request.user
            if not request.user.is_authenticated:
                user_name = None

            create_roster_util = CreateRosterUtilService()
            roster = None
            process_status = status.HTTP_201_CREATED
            try:
                with transaction.atomic():
                    roster = create_roster_util.prepare_roster(
                        user_name, participants, holidays, month, year,
                            is_sunday_included, saturdays_included, session_names, algo_name, title)

            except DuplicateRecordError as duplicate_error:
                roster = duplicate_error.error_value
                process_status = status.HTTP_403_FORBIDDEN

            except RequiredDataError as required_data_error:
                roster = required_data_error.error_value
                process_status = status.HTTP_500_INTERNAL_SERVER_ERROR

            return Response({'message': roster}, status=process_status)
        else:
            return Response(
                serializer.errors, status=status.HTTP_400_BAD_REQUEST)
