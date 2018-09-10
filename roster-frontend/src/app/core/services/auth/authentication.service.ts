import { Injectable } from '@angular/core';

import { Users } from '@interfaces/users-interface'

import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { Router } from '@angular/router';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

/* Custom Service Imports */
import { TokenService } from './token.service'
import { UrlBuilderService } from '@services/utils';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private httpClient: HttpClient,
              private router: Router,
              private tokenService: TokenService,
              private urlBuilderService: UrlBuilderService
              ) { }


  userLogin(user: Users) {

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
            console.log(err)
            return throwError(err.status);
      })
    )
  }

  userLogout() {
    const url = this.urlBuilderService.buildLoginUrl();

    return this.httpClient.delete(url, {}).pipe(
       catchError((err: HttpErrorResponse) => {
         console.log(err)
         return throwError(err.status);
       }),
       tap(res => {
         this.tokenService.removeToken();
       })
     )

  }


}
