from rest_framework import viewsets
from auth_api.serializers import user_profile_serializer
from auth_api.models.user_models import user_profile_model
from django.http import HttpResponse
from rest_framework import status
import json
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_protect
from rest_framework.exceptions import ErrorDetail

class RegisterView(viewsets.ModelViewSet):

    """ ViewSet for registering a new user """

    serializer_class = user_profile_serializer.UserPrfileSerializer
    queryset = user_profile_model.UserProfileModel.objects.all()
    # http_method_names = ['post']

    # @method_decorator(csrf_protect)
    def create(self, request):
        """ Method to create a user prfile """

        serializer = user_profile_serializer.UserPrfileSerializer(data=request.data)

        if (serializer.is_valid()):
            user = user_profile_model.UserProfileModel.objects.create_user(
                email=serializer.validated_data['email'],
                first_name=serializer.validated_data['first_name'],
                last_name=serializer.validated_data['last_name'],
                password=serializer.validated_data['password']
            )
            response_data = {"user": str(user.email)}
            return HttpResponse(response_data, content_type="application/json")

        elif ('email' in serializer.errors):
            print(serializer.errors)
            error_detail = serializer.errors['email'][0]
            if(isinstance(error_detail, ErrorDetail) and error_detail.code == 'unique'):
                return HttpResponse(serializer.errors, status=status.HTTP_409_CONFLICT)
        return HttpResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
