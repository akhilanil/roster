import { Injectable } from '@angular/core';

import { SERVER_IP_ADDRESS, LOGIN_URL, NEW_ROSTER_URL, LIST_ROSTERS_URL, NEW_USER_URL } from '../service-settings'

@Injectable({
  providedIn: 'root'
})
export class UrlBuilderService {

  constructor() { }

  private getServerAddress() : string {
    return SERVER_IP_ADDRESS;
  }


  /*
   * Method to build login url
   */
  public buildLoginUrl(): string {

    return  this.getServerAddress() + LOGIN_URL;

  }

  /*
   * Method to build create roster url
   */
  public buildRotserCreateUrl(): string {

    return  this.getServerAddress() + NEW_ROSTER_URL;

  }

  public buildListRostersUrl(): string {
    return this.getServerAddress() + LIST_ROSTERS_URL;
  }


  /* method to build url for a particular Roster*/
  public buildRosterViewUrl(rosterHash: string): string {
    return this.buildListRostersUrl() + rosterHash + '/';
  }

  public buildNewUserUrl(): string {
    return this.getServerAddress() + NEW_USER_URL;
  }


}
