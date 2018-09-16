import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

/* Custom Service imports */
import { ManageRosterService } from '@services/roster';


@Injectable({
  providedIn: 'root'
})
export class ViewRosterRouteGaurdService implements CanActivate {

  constructor(private manageRosterService: ManageRosterService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    let canRosterBeViewed: boolean = this.manageRosterService.canRosterBeViewed();
    return canRosterBeViewed;

  }

}
