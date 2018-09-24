/**
  * This interface is used for chnage password request.
  */

export interface ChangePasswordModel {

    action: string,
    email_id?: string,
    password_token?: string,
    new_password?: string,
    domain_name?: string
}
