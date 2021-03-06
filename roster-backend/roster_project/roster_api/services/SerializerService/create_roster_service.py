from ...serializers.interface import create_roster_serializer


class CreateRosterSerializerService():

    """ Class which handles the service required for create roster view """

    create_roster_serializer = None

    @classmethod
    def get_serializer_class(seld):
        """ Static method get the associated serializer class """

        return create_roster_serializer.CreateRosterSerializer

    @classmethod
    def get_serializer_instance(self):
        """ Static method to get the Instance of serializer class """

        if(self.create_roster_serializer is None):
            self.create_roster_serializer = create_roster_serializer.CreateRosterSerializer()
        return self.create_roster_serializer

    @classmethod
    def process_request(self, request):
        """ Method to process the requested data """

        return create_roster_serializer.CreateRosterSerializer(data=request.data)
