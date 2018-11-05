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
    console.log(state.url)
    if(state.url.endsWith('login')) {
      return this.activatedRouteForLogin();
    } else {
      return this.activatedRouteForRoster();
    }

  }

  /** Actovated route condition for login. Redirects to user if already logged in */
  private activatedRouteForLogin(): boolean {
    if(this.tokenService.isAuthenticated()) {
      this.router.navigate(['my-rosters'])
      return false;
    } else {
      return true;
    }
  }

  /** Actovated route condition for roster. Allows the user page only if logged in. Other wise redirects to login*/
  private activatedRouteForRoster() : boolean{
    if(this.tokenService.isAuthenticated()) {
      return true;
    } else {
      console.log('hi')
      this.router.navigate(['roster'])
      return false;
    }
  }


}
