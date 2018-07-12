from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

from ..services import CreateRosterService


class ManageRosterView(viewsets.ViewSet):

    """ Manges the roster. Handles the Creation, Updation and Display
        fucntionalities of the Roster """

    serializer_class = CreateRosterService.get_serializer_class()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def create(self, request):
        print(request.user)
        serializer = CreateRosterService.process_request(request)
        if(serializer.is_valid()):
            val = serializer.data.get('participants')

            return Response({'message': val})
        else:
            return Response(
                serializer.errors, status=status.HTTP_400_BAD_REQUEST)
