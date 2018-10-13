import { Injectable } from '@angular/core';

import { ReplaySubject, Observable } from 'rxjs';

/* interface imports*/
import { CreateRosterRSModel } from '@interfaces/business-interface'
import { mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RosterListCacheService {


  /* BehaviorSubject used as cache */
  private rosterListSubject: ReplaySubject<CreateRosterRSModel>;

  /* Cache as observable */
  public rosterListCache: Observable<CreateRosterRSModel> ;

  /* Indicator for empty cache */
  private emptyCache: boolean


  constructor() {}


  /**
  * The item to be added to cache. Entire list of CreateRosterRSModel will be passed as param
  * @param Array<CreateRosterRSModel>
  */
  public initCache(itemsToCache: Array<CreateRosterRSModel>) {

    this.rosterListSubject = new ReplaySubject(12);
    this.rosterListCache = this.rosterListSubject.asObservable();

    this.emptyCache = itemsToCache.length === 0;

    itemsToCache.forEach(itemToCache => {
      this.updateCache(itemToCache);
    })

  }

  /**
  * New item which is to be added to cache.
  * @param Array<CreateRosterRSModel>
  */
  public updateCache(itemToCache: CreateRosterRSModel) {
    this.rosterListSubject.next(itemToCache);
    this.emptyCache = false;
  }

  /**
   * This service method resets the cache. Invoked when an item is deleted.
   */
  public resetCache() {
    this.emptyCache = true;
    this.rosterListSubject.complete()

  }

  /**
   * This method checks whether the cache is already set. It checks whether any
   * active subscribers exist for the cache
   */
   public isCacheSet(): boolean {

     let isCacheAlreadySet: boolean = false

    if(this.rosterListCache != undefined /*&& this.rosterListSubject.observers.length != 0*/) {
       isCacheAlreadySet = true;
     }

     return isCacheAlreadySet;
   }

   /** Method to check whether the cache is empty */
   public isCacheEmpty(): boolean {
     return this.emptyCache;
   }

}
