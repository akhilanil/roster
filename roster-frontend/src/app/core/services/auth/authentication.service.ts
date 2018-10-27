import { Injectable } from '@angular/core';

/* interface import */
import { Users } from '@interfaces/users-interface'
import { ChangePasswordModel } from '@interfaces/business-interface'


import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { Router } from '@angular/router';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

/* Custom Service Imports */
import { TokenService } from './token.service'
import { UrlBuilderService } from '@services/utils';
import { USER_ALREADY_EXIST } from '@app/core/services/errors/client-exception';
import { VALIDATE_EMAIL_ACTION, VALIDATE_PSSWRD_RST_ACTION, VALIDATE_PSSWRD_RST_TOKEN_ACTION } from '@services/data/server-data'
import { ErrorHandlerService } from '@services/errors'

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private httpClient: HttpClient,
              private router: Router,
              private tokenService: TokenService,
              private urlBuilderService: UrlBuilderService,
              private errorHandlerService: ErrorHandlerService
              ) { }


  public userLogin(user: Users): Observable<any> {


    const url = this.urlBuilderService.buildLoginUrl();

    const requestBody = {
      "username" : user.username,
      "password" : user.password
    }
    const loginHeaders = new HttpHeaders()
                  .set('No-Auth','True')


    return this.httpClient.post(url, requestBody, {headers: loginHeaders})
      .pipe(
          catchError((err: HttpErrorResponse) => {
            return throwError(err.status);
          })
    )
  }

  /**
  * Method to logout user. It removes the token from local storage.
  */
  public userLogout() {
      this.tokenService.removeToken();
  }


  /*
   * Service Method for new User registeration
   */
  public registerNewUser(newUser: Users) {

    const url = this.urlBuilderService.buildNewUserUrl();

    const requestHeaders = new HttpHeaders()
                  .set('No-Auth','True')

    const requestBody = {
      "email": newUser.username,
      "first_name": newUser.firstName,
      "last_name": newUser.lastName,
      "password": newUser.password
    }

    return this.httpClient.post(url, requestBody, {headers: requestHeaders}).pipe (


      map((res) =>{
        return res
      }),
      catchError((err: HttpErrorResponse) => {

        if(err.status == 409) {

          return throwError(USER_ALREADY_EXIST)
        }
        return throwError(err.status)
      })
    )}

  /**
    * This method is used to trigger first api call for password reset.
    * @param email_id the emailid to which reset link is to be send
    */
  public resetPasswordRequest(email_id: string) {

    const requestUrl: string = this.urlBuilderService.buildResetPasswordUrl();

    let requestData: ChangePasswordModel = {
      action: VALIDATE_EMAIL_ACTION,
      email_id: email_id,
      domain_name: this.urlBuilderService.getClientDomainAddress()
    }

    const requestHeaders = new HttpHeaders()
                  .set('No-Auth','True')

    return this.httpClient.post(requestUrl, requestData, {headers: requestHeaders}).pipe (
      map((res) => res),
      catchError((err: HttpErrorResponse) => {
        let response = this.errorHandlerService.getErrorResponse(err)
        return throwError(response)
      })
    )
  }


  /**
    * This method is used to validate the request for validating the password.
    * @param token the token corresponding to the users
    */
  public validateTokenForPasswordReset(token: string):  Observable<boolean> {

    const requestUrl: string = this.urlBuilderService.buildResetPasswordUrl();

    let requestData: ChangePasswordModel = {
      action: VALIDATE_PSSWRD_RST_TOKEN_ACTION,
      password_token: token,
    }
    const requestHeaders = new HttpHeaders()
                  .set('No-Auth','True')

    return this.httpClient.post(requestUrl, requestData, {headers: requestHeaders}).pipe (
      map((res) => true ),
      catchError((err) => throwError(false))
    )

  }

  /**
    * This method is used to confirm the password.
    * @param token the token corresponding to the users
    * @param password the new password
    */
  public confirmResetPassword(token: string, password: string) {
    const requestUrl: string = this.urlBuilderService.buildResetPasswordUrl();

    let requestData: ChangePasswordModel = {
      action: VALIDATE_PSSWRD_RST_ACTION,
      password_token: token,
      new_password: password
    }

    const requestHeaders = new HttpHeaders()
                  .set('No-Auth','True')

    return this.httpClient.post(requestUrl, requestData, {headers: requestHeaders}).pipe (
      map((res) => res),
      catchError((err: HttpErrorResponse) => {
        return throwError(err.status)
      })
    )

  }

}
