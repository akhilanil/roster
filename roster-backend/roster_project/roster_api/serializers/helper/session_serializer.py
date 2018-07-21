from rest_framework import serializers


from roster_api.constants.serializer_const import create_roster_constants


class SessionSerializer(serializers.Serializer):
    """ Serializer for Session mentioned in  the
        ParticipantSerializer """

    leaveDate = serializers.DateField()
    sessionNames = serializers.ListField(
        child=serializers.CharField(max_length=15, required=True),
        required=True
    )

    def validate_sessionNames(self, value):

        if create_roster_constants.MAX_NUMBER_OF_SESSIONS < len(value) and \
           create_roster_constants.MIN_NUMBER_OF_SESSIONS > len(value):
            raise serializers.ValidationError(
                create_roster_constants.INVALID_NUMBER_OF_SESSIONS)
        return value
