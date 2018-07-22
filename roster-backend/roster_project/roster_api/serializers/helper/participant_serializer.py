from rest_framework import serializers

from .session_serializer import SessionSerializer


class ParticipantSerializer(serializers.Serializer):

    """ Serializer for participants mentioned in  the
        CreateRosterSerializer """

    name = serializers.CharField(max_length=30, required=True)
    leaveSessions = SessionSerializer(many=True)
