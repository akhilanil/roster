from rest_framework import serializers


class PasswordResetSerializer(serializers.Serializer):

    class meta:

        action = serializers.CharField(max_length=30, required=True)
        email_id = serializers.EmailField()
