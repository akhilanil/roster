from rest_framework import viewsets, mixins
from auth_api.views.login.authentication import ExpiringTokenAuthentication


class GetRosterView(mixins.RetrieveModelMixin,
                    mixins.ListModelMixin,
                    viewsets.GenericViewSet):

    """
    View for implementing rotser listing and retrieval

    """

    authentication_classes = (ExpiringTokenAuthentication,)
    permission_classes = ()
    lookup_field = 'unique_id'

    def get_queryset(self):
        from roster_api.models.user_roster_model import UserRosterModel

        if self.action == 'list':
            user = self.request.user
            return UserRosterModel.objects.filter(user_name=user)

        if self.action == 'retrieve':
            
            unique_id = self.kwargs["unique_id"]
            return UserRosterModel.objects.filter(unique_id=unique_id)

    def get_serializer_class(self):
        from roster_api.services.SerializerService import view_roster_service

        return view_roster_service.ViewRosterSerializerService.get_serializer_class()
