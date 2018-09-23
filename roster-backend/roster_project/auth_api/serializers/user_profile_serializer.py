from rest_framework import serializers
from auth_api.models.user_models import user_profile_model


class UserPrfileSerializer(serializers.ModelSerializer):
    """ Serializer for User profile """

    class Meta:
        model = user_profile_model.UserProfileModel
        fields = ('id', 'email', 'first_name', 'last_name', 'password')
        extra_kwargs = {
                            'password': {'write_only': True},
                            'email': {
                                'error_messages': {
                                    'unique': 'User already exist'
                                }
                            }
                        }
