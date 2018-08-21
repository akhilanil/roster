from rest_framework.authentication import TokenAuthentication
from rest_framework import viewsets, mixins
# from roster_api.services.SerializerService import view_roster_service
# from roster_api.serializers.interface.view_roster_serializer import ViewRosterSerializer
#


class GetRosterView(mixins.RetrieveModelMixin,
                    mixins.ListModelMixin,
                    viewsets.GenericViewSet):

    """

    """

    authentication_classes = (TokenAuthentication,)
    permission_classes = ()
    lookup_field = 'unique_id'
    # serializer_class = ViewRosterSerializer
        # view_roster_service.ViewRosterSerializerService.get_service_instance().get_serializer_class()


    def get_queryset(self):
        from roster_api.models.user_roster_model import UserRosterModel

        if self.action == 'list':
            user = self.request.user
            # print("------------------->",user)
            query_set = UserRosterModel.objects.filter(user_name=user)
            # values = ['unique_id', 'month']
            # query_set.values(*values)
            return query_set

        if self.action == 'retrieve':
            unique_id = self.kwargs["unique_id"]
            return UserRosterModel.objects.filter(unique_id=unique_id)

    def get_serializer_class(self):
        from roster_api.services.SerializerService import view_roster_service
        # if self.action == 'retrieve':
        #     return view_roster_service.ViewRosterSerializerService.get_serializer_class()
        return view_roster_service.ViewRosterSerializerService.get_serializer_class()