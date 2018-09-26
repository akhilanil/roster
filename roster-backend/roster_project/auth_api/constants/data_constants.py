"""

This constant class defines the constants reuired for data synchronization
betwen the client and the server.

"""

""" Action representing the first API call for password reset. """
VALIDATE_EMAIL_ACTION = "VALIDATE_EMAIL_ACTION"

""" Action representing the second API call for  submitting the new password. """
VALIDATE_PSSWRD_RST_ACTION = "VALIDATE_PASSWORD_RESET_ACTION"

""" Action representing the second API call for  validating the token"""
VALIDATE_PSSWRD_RST_TOKEN_ACTION = "VALIDATE_PASSWORD_RESET_TOKEN_ACTION"


""" Action representing the third API call for  submitting the new password. """
VALIDATE_PSSWRD_RST_ACTION = "VALIDATE_PASSWORD_RESET_ACTION"


""" Response for invalid email """
INVALID_EMAIL = "NOT_REGISTERED"

""" Missing email id """
MISSING_EMAILID = "MISSING_EMAILID"

""" Missing email id """
MISSING_TOKEN = "MISSING_TOKEN"

""" Missing new password """
MISSING_NEW_PASSWORD = "MISSING_NEW_PASSWORD"

""" Missing new password """
MISSING_DOMAIN_NAME = "MISSING_DOMAIN_NAME"
