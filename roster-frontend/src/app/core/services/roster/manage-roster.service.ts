import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse } from "@angular/common/http";

import { catchError, map } from 'rxjs/operators';

import { BehaviorSubject } from 'rxjs';

/* interface imports*/
import { CreateRosterRQModel, CreateRosterRSModel } from '@interfaces/business-interface'

/* Custom Service Imports */
import { TokenService } from '@services/auth'
import { UrlBuilderService, DateUtilsService } from '@services/utils';


@Injectable({
  providedIn: 'root'
})
export class ManageRosterService {

  private rosterDisplaySubject = new BehaviorSubject<CreateRosterRSModel | string>('No Data');
  public currentRoster: Observable<CreateRosterRSModel | string> = this.rosterDisplaySubject.asObservable();

  constructor(private httpClient: HttpClient,
              private tokenService: TokenService,
              private urlBuilderService: UrlBuilderService,
              private dateUtilService: DateUtilsService
              ) { }


  /* Method to send HTTP Post request to create a new request */
  public createNewRoster(request : CreateRosterRQModel) : Observable< CreateRosterRSModel | string > {

    let url = this.urlBuilderService.buildRotserCreateUrl();
    return this.httpClient.post(url, request)
      .pipe(
          map((res: {message: CreateRosterRSModel | string}) => res['message'] ),
          catchError((err: HttpErrorResponse) => {
            return throwError(err.status);
          })
      )
  }

  /* Method to change the value in the BehaviorSubject */
  public setRosterDisplaySubject(message: CreateRosterRSModel | string) {
    this.rosterDisplaySubject.next(message);
  }


}
