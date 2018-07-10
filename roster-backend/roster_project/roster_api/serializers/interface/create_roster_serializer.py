from rest_framework import serializers

from ..helper import ParticipantSerializer

from ..constants import MAX_NUMBER_OF_PARTICIPANTS
from ..constants import MIN_NUMBER_OF_PARTICIPANTS
from ..constants import MAX_NUMBER_OF_SESSIONS
from ..constants import MIN_NUMBER_OF_SESSIONS

from ..exceptions import INVALID_NUMBER_OF_PARTICIPANTS
from ..exceptions import INVALID_NUMBER_OF_SESSIONS


class CreateRosterSerializer(serializers.Serializer):
    """ Serializer for roster creation request """

    participants = ParticipantSerializer(many=True)
    holidays = serializers.ListField(
        child=serializers.DateField(),
        required=True
    )
    isSundayIncluded = serializers.BooleanField(default=False)
    saturdaysIncluded = serializers.ListField(
        child=serializers.BooleanField(default=False),
        required=True
    )

    numberOfSessions = serializers.IntegerField(
                            required=True,
                            max_value=4,
                            min_value=1
                        )
    sessionNames = serializers.ListField(
        child=serializers.CharField(max_length=15, required=True),
        required=True
    )

    rosterForMonth = serializers.IntegerField(
        required=True,
        max_value=12,
        min_value=1
    )
    rosterForYear = serializers.IntegerField(required=True)

    def validate_participants(self, value):

        if MAX_NUMBER_OF_PARTICIPANTS < len(value) and \
           MIN_NUMBER_OF_PARTICIPANTS > len(value):
            raise serializers.ValidationError(INVALID_NUMBER_OF_PARTICIPANTS)
        return value

    def validate_sessionNames(self, value):

        if MAX_NUMBER_OF_SESSIONS < len(value) and \
           MIN_NUMBER_OF_SESSIONS > len(value):
            raise serializers.ValidationError(INVALID_NUMBER_OF_SESSIONS)
        return value
