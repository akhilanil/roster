import { Injectable } from '@angular/core';
import { HttpErrorResponse} from "@angular/common/http";

/* Server response constants */
import { TOKEN_EXPIRED_SERVER, INVALID_TOKEN_SERVER, NOT_FOUND_SERVER } from './server-exception'
import { PASSWORD_RST_INVALID_EMAIL_SERVER } from './server-exception'

/* Client response constants */
import { TOKEN_EXPIRED_CLIENT, INVALID_TOKEN_CLIENT, NOT_FOUND_CLIENT } from './client-exception'
import { PASSWORD_RST_INVALID_EMAIL_CLIENT } from './client-exception'
import { DELETE_ROSTER_CLIENT } from './action-performed'

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor() { }

  /**
    * Mehtod to get the proper client response from HttpErrorResponse
    */
  public getErrorResponse(httpErrorResponse: HttpErrorResponse, action?: string): any {

    if(httpErrorResponse.status === 401) {
      if(httpErrorResponse.error['detail']) {
        let responseServerMessage: string = httpErrorResponse.error['detail'].trim();
        if(TOKEN_EXPIRED_SERVER === responseServerMessage ) {
          return TOKEN_EXPIRED_CLIENT;
        }
      } else if(httpErrorResponse.error['data']) {
        let responseServerMessage: string = httpErrorResponse.error['data'].trim();
        if(INVALID_TOKEN_SERVER === responseServerMessage ) {
          return INVALID_TOKEN_CLIENT;
        }
      }
    } else if(httpErrorResponse.status === 404) {
      if(httpErrorResponse.error['data']) {
        let responseServerMessage: string = httpErrorResponse.error['data'].trim();
        if(PASSWORD_RST_INVALID_EMAIL_SERVER === responseServerMessage ) {
          return PASSWORD_RST_INVALID_EMAIL_CLIENT;
        }
      } else if(httpErrorResponse.error['detail']) {
        let responseServerMessage: string = httpErrorResponse.error['detail'].trim();
        if(DELETE_ROSTER_CLIENT === action ) {
          if( NOT_FOUND_SERVER === responseServerMessage)
          return NOT_FOUND_CLIENT;
        } else {
          return responseServerMessage
        }
      }
    }
    return httpErrorResponse;
  }


  public getErrorResposneBasedOnAction(action: string): void {

  }



}
