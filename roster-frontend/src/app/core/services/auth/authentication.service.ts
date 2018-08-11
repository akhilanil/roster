import { Injectable } from '@angular/core';

import { Users } from '@interfaces/users-interface'

import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { Router } from '@angular/router';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

/* Service Token */
import { TokenService } from './token.service'


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private httpClient: HttpClient,
              private router: Router,
              private tokenService: TokenService
              ) { }


  userLogin(user: Users) {

    // const url = this.router.url +' /auth';
    const url = "http://127.0.0.1:8000/login/";
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
}
