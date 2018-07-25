from rest_framework import serializers
from roster_api.models import user_roster_model


class ViewRosterSerializer(serializers.ModelSerializer):
    """
        Serializer for viewing the roster created by the user
    """

    users = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    lookup_field = 'unique_id'

    class Meta:

        model = user_roster_model.UserRosterModel
        fields = ('unique_id', 'user_name', 'month', 'year', 'title', 'users')
