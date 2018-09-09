import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse } from "@angular/common/http";

import { catchError, map } from 'rxjs/operators';



/* interface imports*/
import { CreateRosterRQModel } from '@interfaces/business-interface'

/* Custom Service Imports */
import { TokenService } from './token.service'
import { UrlBuilderService } from '@services/utils';


@Injectable({
  providedIn: 'root'
})
export class CreateRosterService {

  constructor(private httpClient: HttpClient,
              private tokenService: TokenService,
              private urlBuilderService: UrlBuilderService
              ) { }


  public createNewRoster(request : CreateRosterRQModel) : Observable {

    let url = urlBuilderService.buildRotserCreateUrl();


    return this.httpClient.post(url, request)
      .pipe(
          catchError((err: HttpErrorResponse) => {
            return throwError(err.status);
      })
    )

  }


}
