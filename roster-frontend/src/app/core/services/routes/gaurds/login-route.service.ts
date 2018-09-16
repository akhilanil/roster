import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { TokenService } from '@services/auth';

@Injectable({
  providedIn: 'root'
})
export class LoginRouteService implements CanActivate {

  constructor(private tokenService: TokenService, private router:Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    if(this.tokenService.isAuthenticated()) {
      return true;
    } else {
      this.router.navigate(['/roster'])
      return false;
    }
  }


}
