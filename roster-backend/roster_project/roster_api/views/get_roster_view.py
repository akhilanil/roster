from rest_framework import viewsets, mixins
# from roster_api.services.SerializerService import view_roster_service
# from roster_api.serializers.interface.view_roster_serializer import ViewRosterSerializer
#

class GetRosterView(mixins.RetrieveModelMixin,
                    viewsets.GenericViewSet):

    """

    """


    lookup_field = 'unique_id'
    # serializer_class = ViewRosterSerializer
        # view_roster_service.ViewRosterSerializerService.get_service_instance().get_serializer_class()


    def get_queryset(self):
        from roster_api.models.user_roster_model import UserRosterModel
        unique_id = self.kwargs["unique_id"]
        return UserRosterModel.objects.filter(unique_id=unique_id)
        # import pdb; pdb.set_trace()
        # return user


    def get_serializer_class(self):
         from roster_api.services.SerializerService import view_roster_service
         return view_roster_service.ViewRosterSerializerService.get_serializer_class()
