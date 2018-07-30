from rest_framework import serializers
from roster_api.models import user_roster_model, user_roster_deatils_model


class UserDetailsSerializer(serializers.ModelSerializer):
    """
        Serializer for UserDetailsSerializer to get the related fields
    """

    class Meta:
        model = user_roster_deatils_model.UserRosterDetailsModel
        fields = ('participant_name', 'participant_dates', 'per_session_count')


class ViewRosterSerializer(serializers.ModelSerializer):
    """
        Serializer for viewing the roster created by the user
    """

    user_rotsers = UserDetailsSerializer(many=True, read_only=True)
    
    class Meta:

        model = user_roster_model.UserRosterModel
        fields = ('unique_id', 'user_name', 'month', 'year', 'title', 'user_rotsers')
        depth = 1
