import { Injectable } from '@angular/core';

import { Users } from '@interfaces/users-interface'

import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { Router } from '@angular/router';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

/* Custom Service Imports */
import { TokenService } from './token.service'
import { UrlBuilderService } from '@services/utils';
import { USER_ALREADY_EXIST } from '@app/core/services/errors/client-exception';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private httpClient: HttpClient,
              private router: Router,
              private tokenService: TokenService,
              private urlBuilderService: UrlBuilderService
              ) { }


  public userLogin(user: Users): Observable<any> {

    // const url = this.router.url +' /auth';
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

      catchError((err: HttpErrorResponse) => {
        
        if(err.status == 409) {

          return throwError(USER_ALREADY_EXIST)
        }
        return throwError(err.status)
      })

    )


  }


}
