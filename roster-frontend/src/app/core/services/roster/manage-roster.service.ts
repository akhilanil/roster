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

  /* This variable is used by the route gaurd so that ViewRoster component in loaded without entering any data */
  private isRosterViewable: boolean;

  constructor(private httpClient: HttpClient,
              private tokenService: TokenService,
              private urlBuilderService: UrlBuilderService,
              private dateUtilService: DateUtilsService
  ) {

        this.isRosterViewable = false;  // Intially setting it to false

  }


  /* Method to send HTTP Post request to create a new request */
  public createNewRoster(request : CreateRosterRQModel) : Observable< CreateRosterRSModel | string > {

    let url = this.urlBuilderService.buildRotserCreateUrl();

    let requestHeaders: HttpHeaders;
    if(!this.tokenService.isAuthenticated()) {
      requestHeaders = new HttpHeaders()
                    .set('No-Auth','True')

    }


    return this.httpClient.post(url, request, {headers: requestHeaders})
      .pipe(
          map((res: {message: CreateRosterRSModel | string}) => {

              return res['message'];

          } ),
          catchError((err: HttpErrorResponse) => {
            console.log(err);
            return throwError(err.status);
          })
      )
  }

  /* Method to change the value in the BehaviorSubject */
  public setRosterDisplaySubject(message: CreateRosterRSModel | string) {
    this.rosterDisplaySubject.next(message);
    this.isRosterViewable = true;
  }

  /* This method is used by the route gaurd */
  public canRosterBeViewed(): boolean {
    return this.isRosterViewable;
  }


}
