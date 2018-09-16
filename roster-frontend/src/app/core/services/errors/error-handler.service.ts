import { Injectable } from '@angular/core';
import { HttpErrorResponse} from "@angular/common/http";

/* Server response constants */
import { TOKEN_EXPIRED_SERVER } from './server-exception'

/* Client response constants */
import { TOKEN_EXPIRED_CLIENT } from './client-exception'



@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor() { }

  /**
    * Mehtod to get the proper client response from HttpErrorResponse
    */
  public getErrorResponse(httpErrorResponse: HttpErrorResponse): string {

    if(httpErrorResponse.status === 401) {
      if(httpErrorResponse.error['detail']) {
        let responseServerMessage: string = httpErrorResponse.error['detail'].trim();
        if(TOKEN_EXPIRED_SERVER === responseServerMessage ) {
          return TOKEN_EXPIRED_CLIENT;
        }
      }
    }

  }


}
