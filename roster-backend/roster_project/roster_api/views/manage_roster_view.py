from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status


from ..services import CreateRosterService


class ManageRosterView(viewsets.ViewSet):

    """ Manges the roster. Handles the Creation, Updation and Display
        fucntionalities of the Roster """

    serializer_class = CreateRosterService.get_serializer_class()

    def create(self, request):
        serializer = CreateRosterService.process_request(request)

        if(serializer.is_valid()):
            val = serializer.data.get('participants')

            return Response({'message': val})
        else:
            return Response(
                serializer.errors, status=status.HTTP_400_BAD_REQUEST)
