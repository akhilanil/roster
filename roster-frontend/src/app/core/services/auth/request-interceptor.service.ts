import { Injectable } from '@angular/core';

import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

import { HttpInterceptor, HttpRequest, HttpHandler, HttpUserEvent, HttpEvent } from "@angular/common/http";

import { Router } from "@angular/router";

import {TokenService} from './token.service'
import { UrlBuilderService } from '@services/utils';




@Injectable({
  providedIn: 'root'
})
export class RequestInterceptorService implements HttpInterceptor {

  constructor(
              private router: Router,
              private tokenService: TokenService,
              private urlBuilderService: UrlBuilderService

              ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (!req.headers.has('Content-Type')) {
           req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });
    }
    req = req.clone({ headers: req.headers.set('Accept', 'application/json') });

    if (req.headers.get('No-Auth') == "True" || this.isNoAuthRequiredURLs(req.url)){

      return next.handle(req.clone());
    }



    if(this.tokenService.isAuthenticated()) {
      const token: string = this.tokenService.getToken();

      const autherizedRequest = req.clone({
        headers : req.headers.set("Authorization", "Token " + token)
      });

      return next.handle(autherizedRequest).pipe(
        tap(
          succ => {},
          err => {
            
          }
        )
      )
    }
  }

  /** This method checks whether the request falls in the category of safe list urls.
    * If it is a safe url then No-Auth required can be confirmed
    */
  private isNoAuthRequiredURLs(url: string) : boolean {

    return this.urlBuilderService.isSafeURL(url);

  }


}
