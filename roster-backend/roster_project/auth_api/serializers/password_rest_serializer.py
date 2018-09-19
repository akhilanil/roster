from rest_framework import serializers
from auth_api.constants.data_constants import \
    VALIDATE_EMAIL_ACTION, VALIDATE_PSSWRD_RST_ACTION, MISSING_EMAILID, \
    MISSING_TOKEN, MISSING_NEW_PASSWORD, MISSING_DOMAIN_NAME


class PasswordResetSerializer(serializers.Serializer):

    """ serializer class for Password reset  """

     # Represents the purpose of the current request
    action = serializers.CharField(max_length=30, required=True)

    # Represents the email_id whose password is to be changed
    email_id = serializers.EmailField(max_length=50, required=False)

    # Represents the password token
    password_token = serializers.CharField(max_length=36, required=False)

    # Represents the newly created password
    new_password = serializers.CharField(max_length=15, min_length=4, required=False)

    # Represents the url to which the token is to be appended
    domain_name = serializers.CharField(max_length=50, required=False)

    def validate(self, data):
        """
            The validate method of serializer

        """

        if (VALIDATE_EMAIL_ACTION == data['action']):
            if('email_id' not in data):
                raise serializers.ValidationError(MISSING_EMAILID)
            elif('domain_name' not in data):
                raise serializers.ValidationError(MISSING_DOMAIN_NAME)
            return data
        elif (VALIDATE_PSSWRD_RST_ACTION == data['action']):
            if ('password_token' not in data):
                raise serializers.ValidationError(MISSING_TOKEN)
            elif ('new_password' not in data):
                raise serializers.ValidationError(MISSING_NEW_PASSWORD)
            return data
        else:
            raise serializers.ValidationError("INVALID_ACTION")
