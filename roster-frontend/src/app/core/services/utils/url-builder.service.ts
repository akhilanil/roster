import { Injectable } from '@angular/core';

import {  LOGIN_URL, NEW_ROSTER_URL, LIST_ROSTERS_URL,
  NEW_USER_URL,  RESET_PASSWORD_URL, GITHUB_LINK, GITHUB_IMG_SAFE_URL } from '../service-settings'

// import { SERVER_DOMAIN, CLIENT_DOMAIN } from '@app/settings'

import { environment } from '../../../../environments/environment'

import {SAFE_URL_LIST} from '../safe-url';

@Injectable({
  providedIn: 'root'
})
export class UrlBuilderService {

  constructor() { }

  private getServerAddress() : string {


    return environment.serverDomain;

    //return SERVER_DOMAIN;
  }

  public getClientDomainAddress(): string {
    return environment.clientDomain;

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

  /** Method to build url for new user */
  public buildNewUserUrl(): string {
    return this.getServerAddress() + NEW_USER_URL;
  }

  /** Method to build url to reset password */
  public buildResetPasswordUrl(): string {
    return this.getServerAddress() + RESET_PASSWORD_URL;
  }

  /** Service method to get the GitHub link @return GitHub link (string)*/
  public buildGitHubLinkUrl(): string {
    return GITHUB_LINK;
  }

  /** Service method to get the URL for github img */
  public buildGetGitHubImageUrl(): string {
    return GITHUB_IMG_SAFE_URL;
  }

  /** Method to check whether these urls are safe. Includes all urls in the assets folder */
  public isSafeURL(url : string): boolean {
    return SAFE_URL_LIST.includes(url)
  }


}
