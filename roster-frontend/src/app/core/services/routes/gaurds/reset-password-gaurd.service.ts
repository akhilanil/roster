import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '@services/auth'

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordGaurdService implements CanActivate {

  constructor(private authService: AuthenticationService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    let token = route.params.id;
    return this.authService.validateTokenForPasswordReset(token)
  }

}
