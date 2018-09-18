from rest_framework import viewsets
from rest_framework import status
from rest_framework.response import Response

from django.core.mail import BadHeaderError, send_mail

from auth_api.services.password_reset_service import PasswordResetService

from .data_constants import VALIDATE_EMAIL_ACTION, INVALID_EMAIL


class ResetPassword(viewsets.ModelViewSet):

    """
        Handles reset password options
    """

    serializer_class = PasswordResetService.get_password_reset_serializer_class()

    def create(self, request):
        """
            Handles the different POST request in Password reset
        """

        serializer = PasswordResetService.get_password_reset_serializer_object()
        UserProfileModel = PasswordResetService.get_user_profile_model_class()
        PasswordResetModel = PasswordResetService.get_password_reset_model_class()

        if(serializer.is_valid()):
            action = serializer.data.get('action')
            if(VALIDATE_EMAIL_ACTION == action):

                resposne_status = status.HTTP_200_OK
                response = {'data': "SUCCESS"}

                email_id = serializer.data.get('email_id')
                is_valid_user = UserProfileModel.objects.is_existing_user(email=email_id)
                user = UserProfileModel.objects.get_user(email=email_id)

                if(not is_valid_user):
                    response = {'data': INVALID_EMAIL}
                    resposne_status = status.HTTP_409_CONFLICT
                else:
                    PasswordResetModel.objects.insert_new_token(user)

                    # perform email service

                    pass

                return Response(response, status=resposne_status)
