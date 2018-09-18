from auth_api.serializers import password_rest_serializer


class PasswordResetService():

    """
        Service class for password reset
    """

    serializer = None

    @classmethod
    def get_password_reset_serializer_class(self):
        """
            Method to return the serializer class

        """
        return password_rest_serializer.PasswordResetSerializer

    @classmethod
    def get_password_reset_serializer_object(self):
        """
            Method to return the Instance of serializer class

        """
        if(self.serializer is None):
            self.serializer = password_rest_serializer.PasswordResetSerializer()
        return self.serializer

    @classmethod
    def get_user_profile_model_class(self):
        """
            Method to return the UserRosterModel class

        """

        from auth_api.models.user_models import UserProfileModel
        return UserProfileModel

    @classmethod
    def get_password_reset_model_class(self):
        """
            Method to return the PasswordResetModel class

        """

        from auth_api.models.user_models.password_reset_model import PasswordResetModel
        return PasswordResetModel
