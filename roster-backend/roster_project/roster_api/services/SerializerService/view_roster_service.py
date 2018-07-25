from roster_api.serializers.interface import view_roster_serializer

class ViewRosterSerializerService(object):
    """ Class which handles the service required for Display roster view """

    view_roster_serializer_service = None

    @classmethod
    def get_serializer_class(self):
        """ Static method get the associated serializer class """

        return view_roster_serializer.ViewRosterSerializer

    def __get_view_roster_serializer(self):

        return view_roster_serializer
