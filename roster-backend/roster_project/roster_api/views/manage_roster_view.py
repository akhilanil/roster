from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

from roster_api.services.SerializerService.create_roster_service import CreateRosterSerializerService
from roster_api.services.util_services.business_utils.create_roster_util_service import CreateRosterUtilService


class ManageRosterView(viewsets.ViewSet):

    """ Manges the roster. Handles the Creation, Updation and Display
        fucntionalities of the Roster """

    serializer_class = CreateRosterSerializerService.get_serializer_class()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

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

            create_roster_util = CreateRosterUtilService()
            roster = create_roster_util.prepare_roster(
                request.user, participants, holidays, month, year,
                    is_sunday_included, saturdays_included, session_names, algo_name)

            for x in roster:
                print(x)
            return Response({'message': roster.__str__()})
        else:
            return Response(
                serializer.errors, status=status.HTTP_400_BAD_REQUEST)
