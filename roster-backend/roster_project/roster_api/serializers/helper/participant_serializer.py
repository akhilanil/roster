from rest_framework import serializers


class ParticipantSerializer(serializers.Serializer):

    """ Serializer for participants mentioned in  the
    CreateRosterSerializer """

    name = serializers.CharField(max_length=15)
    leave_dates = serializers.ListField(serializers.DateField())
