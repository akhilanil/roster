import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

/* interface imports*/
import { CreateRosterRSModel } from '@interfaces/business-interface'
import { mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RosterListCacheService {


  /* BehaviorSubject used as cache */
  private rosterListSubject: BehaviorSubject<Array<CreateRosterRSModel>>;

  /* Cache as observable */
  public rosterListCache: Observable<Array<CreateRosterRSModel>> = this.rosterListSubject.asObservable();


  constructor() {

    /* Cache can store maximum of twelve Roster */
    this.rosterListSubject = new BehaviorSubject(null);
  }


  /**
  * The item to be added to cache. Entire list of CreateRosterRSModel will be passed as param
  * @param Array<CreateRosterRSModel>
  */
  public setRosterListCacheInBulk(itemToCache: Array<CreateRosterRSModel>) {
    this.rosterListSubject.next(itemToCache);
  }

}
