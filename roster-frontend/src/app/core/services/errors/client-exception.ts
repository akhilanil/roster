/* Maps ALL custom client actions. This has to be maintained in synchronous with the client action file */

/* Token expired client action */
export const TOKEN_EXPIRED_CLIENT: string = 'Token has expired'

/* Unauthorized access client action */
export const UNAUTHORIZED_ACCESS_CLIENT: string = 'Invalid token'

/* User deleted client action */
export const USER_DELETED_CLIENT: string = 'User inactive or deleted'

/* This is passed by the service method is the user is found to be existing */
export const USER_ALREADY_EXIST = "USER_ALREADY_EXIST"


/**Client Response  to be mapped from server response for invalid email during password reset*/
export const PASSWORD_RST_INVALID_EMAIL_CLIENT = "NOT_REGISTERED"
