from rest_framework import viewsets
from rest_framework import status
from rest_framework.response import Response

from django.core.mail import BadHeaderError, send_mail

from auth_api.services.password_reset_service import PasswordResetService

from auth_api.constants.data_constants import \
    VALIDATE_EMAIL_ACTION, INVALID_EMAIL, VALIDATE_PSSWRD_RST_ACTION


class ResetPasswordView(viewsets.ViewSet):

    """
        Handles reset password options
    """

    serializer_class = PasswordResetService.get_password_reset_serializer_class()

    def create(self, request):
        """
            Handles the different POST request in Password reset
        """
        print(request.data)
        serializer = PasswordResetService.get_password_reset_serializer_object(data=request.data)
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
                    resposne_status = status.HTTP_404_NOT_FOUND
                else:
                    token = PasswordResetModel.objects.insert_new_token(user)
                    response = {'data': token}
                    # perform email service

                    pass

                return Response(response, status=resposne_status)

            elif(VALIDATE_PSSWRD_RST_ACTION == action):

                resposne_status = status.HTTP_200_OK
                response = {'data': "SUCCESS"}

                token = serializer.data.get('password_token')

                is_valid_token = PasswordResetModel.objects.is_record_existing(token=token)

                if(is_valid_token):
                    # get the user, change the user password, delete the user from the other table

                    new_password = serializer.data.get('new_password')
                    user = PasswordResetModel.objects.change_pasword(
                                        token=token, new_password=new_password)

                else:
                    resposne_status = status.HTTP_401_UNAUTHORIZED
                    response = {'data': "INVALID TOKEN"}
                return Response(response, status=resposne_status)
        else:
            return Response(
                serializer.errors, status=status.HTTP_400_BAD_REQUEST)
