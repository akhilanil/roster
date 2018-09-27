from rest_framework import viewsets
from rest_framework import status
from rest_framework.response import Response

from django.core.mail import BadHeaderError, send_mail
from django.core.mail import send_mail
from django.conf import settings
from django.core.exceptions import ValidationError

from auth_api.services.password_reset_service import PasswordResetService

from auth_api.constants.data_constants import \
    VALIDATE_EMAIL_ACTION, INVALID_EMAIL, VALIDATE_PSSWRD_RST_ACTION, \
    VALIDATE_PSSWRD_RST_TOKEN_ACTION


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

                if(not is_valid_user):
                    response = {'data': INVALID_EMAIL}
                    resposne_status = status.HTTP_404_NOT_FOUND
                else:
                    user = UserProfileModel.objects.get_user(email=email_id)
                    token = PasswordResetModel.objects.insert_new_token(user)
                    response = {'data': token}
                    # perform email service
                    domain = serializer.data.get('domain_name') + str(token)
                    subject = 'Your password reset request'
                    message = 'Click here /n ' + domain
                    from_email = settings.EMAIL_HOST_USER
                    to_list = [email_id, settings.EMAIL_HOST_USER]
                    send_mail(subject, message, from_email, to_list, fail_silently=False)

                    pass

                return Response(response, status=resposne_status)

            elif(VALIDATE_PSSWRD_RST_TOKEN_ACTION == action):
                print('TOken validator')
                resposne_status = status.HTTP_200_OK
                response = {'data': "SUCCESS"}
                token = serializer.data.get('password_token')
                print('======>',token)

                try:
                    is_valid_token = PasswordResetModel.objects.is_record_existing(token=token)
                except ValidationError:
                    is_valid_token = False

                if(not is_valid_token):
                    resposne_status = status.HTTP_401_UNAUTHORIZED
                    response = {'data': "INVALID TOKEN"}
                print(response)
                return Response(response, status=resposne_status)

            elif(VALIDATE_PSSWRD_RST_ACTION == action):

                resposne_status = status.HTTP_200_OK
                response = {'data': "SUCCESS"}

                token = serializer.validated_data['password_token']
                print('=========>', token)
                is_valid_token = PasswordResetModel.objects.is_record_existing(token=token)

                if(is_valid_token):
                    # get the user, change the user password, delete the user from the other table

                    new_password = serializer.validated_data['new_password']
                    user = PasswordResetModel.objects.change_pasword(
                                        token=token, new_password=new_password)

                else:
                    resposne_status = status.HTTP_401_UNAUTHORIZED
                    response = {'data': "INVALID TOKEN"}
                return Response(response, status=resposne_status)
        else:
            print(serializer.errors)
            return Response(
                serializer.errors, status=status.HTTP_400_BAD_REQUEST)
