/* Maps ALL custom server responses. This has to be maintained in synchronous with the server response file */

/* Token expired server response */
export const TOKEN_EXPIRED_SERVER: string = 'Token has expired'

/* Unauthorized access server response */
export const UNAUTHORIZED_ACCESS_SERVER: string = 'Invalid token'

/* User deleted server response */
export const USER_DELETED_SERVER: string = 'User inactive or deleted'

/**Server Response for invalid email during password reset*/
export const PASSWORD_RST_INVALID_EMAIL_SERVER = "NOT_REGISTERED"

/**Server Response for invalid token*/
export const INVALID_TOKEN_SERVER = "INVALID_TOKEN"
