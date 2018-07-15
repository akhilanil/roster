from rest_framework import serializers

from ..helper import participant_serializer

from ..constants import create_roster_constants

from ..exceptions import validation_exceptions


class CreateRosterSerializer(serializers.Serializer):
    """ Serializer for roster creation request """


    participants = participant_serializer.ParticipantSerializer(many=True)
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

        MAX_NUMBER_OF_PARTICIPANTS = \
            create_roster_constants.MAX_NUMBER_OF_PARTICIPANTS
        MIN_NUMBER_OF_PARTICIPANTS = \
            create_roster_constants.MIN_NUMBER_OF_PARTICIPANTS
        INVALID_NUMBER_OF_PARTICIPANTS = \
            validation_exceptions.INVALID_NUMBER_OF_PARTICIPANTS

        if MAX_NUMBER_OF_PARTICIPANTS < len(value) and \
           MIN_NUMBER_OF_PARTICIPANTS > len(value):
            raise serializers.ValidationError(INVALID_NUMBER_OF_PARTICIPANTS)
        return value

    def validate_sessionNames(self, value):

        MAX_NUMBER_OF_SESSIONS = create_roster_constants.MAX_NUMBER_OF_SESSIONS
        MIN_NUMBER_OF_SESSIONS = create_roster_constants.MIN_NUMBER_OF_SESSIONS
        INVALID_NUMBER_OF_SESSIONS = \
            validation_exceptions.INVALID_NUMBER_OF_SESSIONS

        if MAX_NUMBER_OF_SESSIONS < len(value) and \
           MIN_NUMBER_OF_SESSIONS > len(value):
            raise serializers.ValidationError(INVALID_NUMBER_OF_SESSIONS)
        return value
