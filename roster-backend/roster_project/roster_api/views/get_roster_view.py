from rest_framework import viewsets, mixins
from auth_api.views.login.authentication import ExpiringTokenAuthentication


from django.core.exceptions import ObjectDoesNotExist, ValidationError



class GetRosterView(mixins.RetrieveModelMixin,
                    mixins.ListModelMixin,
                    mixins.DestroyModelMixin,
                    viewsets.GenericViewSet):

    """
    View for implementing rotser listing and retrieval

    """

    authentication_classes = (ExpiringTokenAuthentication,)
    permission_classes = ()
    lookup_field = 'unique_id'
    #
    # def destroy(self, request, pk):
    #     from roster_api.models.user_roster_model import UserRosterModel
    #     try:
    #         unique_id = pk
    #         roster_to_delete = UserRosterModel.objects.get(unique_id=unique_id)
    #         roster_to_delete.delete()
    #         return Response({'data': "SUCCESS"}, status.HTTP_200_OK)
    #     except (ObjectDoesNotExist):
    #         return Response({'data': "Not Found"}, status.HTTP_404_NOT_FOUND)
    #
    # def list(self, request):
    #     from roster_api.models.user_roster_model import UserRosterModel
    #     from django.core import serializers
    #
    #     user = self.request.user
    #     rosters = UserRosterModel.objects.filter(user_name=user)
    #
    #     return Response(serializers.serialize('json', list(rosters)), status.HTTP_200_OK)
    #
    # def retrieve(self, request, pk):
    #     from roster_api.models.user_roster_model import UserRosterModel
    #     try:
    #         unique_id = pk;
    #         roster = UserRosterModel.objects.get(unique_id=unique_id)
    #
    #         return Response(json.dumps(roster), status.HTTP_200_OK)
    #     except (ObjectDoesNotExist):
    #         return Response({'data': "Not Found"}, status.HTTP_404_NOT_FOUND)

    def get_queryset(self):
        from roster_api.models.user_roster_model import UserRosterModel
        print(self.action)
        if self.action == 'list':
            user = self.request.user
            return UserRosterModel.objects.filter(user_name=user)

        if self.action == 'retrieve':
            unique_id = self.kwargs["unique_id"]
            return UserRosterModel.objects.filter(unique_id=unique_id)

        if self.action == 'destroy':
            try:
                unique_id = self.kwargs["unique_id"]
                roster_to_delete = UserRosterModel.objects.get(unique_id=unique_id)
                roster_to_delete.delete()
                user = self.request.user
                return UserRosterModel.objects.filter(user_name=user)

            except (ObjectDoesNotExist, ValidationError):
                pass

    def get_serializer_class(self):
        from roster_api.services.SerializerService import view_roster_service

        return view_roster_service.ViewRosterSerializerService.get_serializer_class()
