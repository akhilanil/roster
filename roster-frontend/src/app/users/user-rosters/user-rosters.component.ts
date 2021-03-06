import { Component, OnInit, NgZone, OnDestroy } from '@angular/core';

/* Custom service imports */
import { ManageRosterService } from '@services/roster';
import { ErrorHandlerService } from '@services/errors';
import { RosterListCacheService } from '@services/cache-manager'

/* interface imports*/
import { CreateRosterRSModel } from '@interfaces/business-interface'

/* constants import */
import { ROSTER_HEADER, NOT_FOUND_CLIENT } from './constants/ui-constants'
import { TOKEN_EXPIRED_DIALOG_HEADER, TOKEN_EXPIRED_DIALOG_DESCRIPTION } from './constants/ui-constants'
import { VIEW_ROSTER_URL, NEW_ROSTER_URL, CURRENT_ROUTE_URL } from './constants/url-constants'
import { TOKEN_EXPIRED_CLIENT, LOGOUT_ACTION } from './constants/data-constants'

import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { SimpleDialogComponent } from '@app/shared/simple-dialog/simple-dialog.component';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-user-rosters',
  templateUrl: './user-rosters.component.html',
  styleUrls: ['./user-rosters.component.css']
})
export class UserRostersComponent implements OnInit, OnDestroy {


  /* Array conating deatils of all rosters */
  myRosters: Array<CreateRosterRSModel>;

  /* Set to true when data is completely fetched from DB */
  isIntialized: boolean;

  /* Set to true if an error occurs */
  isError: boolean;

  /* Integer to indicate the progress satus of progress bar */
  progressStatus: number;

  /* Count representing the number of rosters for the user. This count is set as the badge */
  rosterCount: number;

  /* String representing the badge color */
  badgeColor: string;

  /* Subscription for cache  */
  cacheSubscription: Subscription

  /* Array containing the raw server side response of the user rosters. This is set either from the cache or by HTTP response */
  rostersResponse: Array<CreateRosterRSModel>

  /* Enable/Disable Delete button */
  isDeleteClicked: boolean;


  constructor(
              private manageRosterService: ManageRosterService,
              private router: Router,
              private errorHandler: ErrorHandlerService,
              private dialog: MatDialog,
              private zone: NgZone,
              private rosterListCacheService: RosterListCacheService,
            ) {

    this.isError = false;
    this.isIntialized = false;
    this.progressStatus = 30;
    this.isDeleteClicked = false;
  }

  ngOnInit() {

    if(this.rosterListCacheService.isCacheSet()) {
      this.rostersResponse = new Array<CreateRosterRSModel>()
      if(this.rosterListCacheService.isCacheEmpty()) {
        this.handleRosterResponse(this.rostersResponse)
      } else {
        this.cacheSubscription = this.rosterListCacheService.rosterListCache.subscribe(
          (roster: CreateRosterRSModel) => {
            this.rostersResponse.push(roster)
            this.handleRosterResponse(this.rostersResponse)
          }
        )
      }

    } else {
      // DO HTTP call
      this.manageRosterService.getAllRostersOfUser().subscribe(
        (rosters: Array<CreateRosterRSModel>) => {
          this.rostersResponse = rosters
          this.handleRosterResponse(this.rostersResponse)
          this.rosterListCacheService.initCache(this.rostersResponse)
        },
        error => {
          const errorResponse: string = this.errorHandler.getErrorResponse(error);
          if(TOKEN_EXPIRED_CLIENT === errorResponse) {
            this.handleTokenExpired()
          }
        }
      )
    }
  }

  /**
    * Handles token Expired error by showing a popup
    */
  private handleTokenExpired() {
    const dialogRef = this.dialog.open(SimpleDialogComponent, {width: '400px',
      data: {title: TOKEN_EXPIRED_DIALOG_HEADER, description: TOKEN_EXPIRED_DIALOG_DESCRIPTION, actions: LOGOUT_ACTION}
    });
    dialogRef.afterClosed().subscribe(() => {
      this.router.navigate(['/']);
      window.location.reload();
    });
  }

  /** Handle roster display  */
  private handleRosterResponse(rosters: Array<CreateRosterRSModel>) {

    this.delay(2000, this.progressStatus, 40).then(val => this.progressStatus = val);
    this.delay(3000, this.progressStatus, 20).then(val => this.progressStatus += val);
    this.delay(4000, this.progressStatus, 30).then(val => this.isIntialized = true);

    this.myRosters = rosters;

    this.rosterCount = rosters.length;

    this.badgeColor = (this.rosterCount >= 10) ? 'warn' : 'primary';

    this.myRosters.forEach((roster) => {
      roster.user_rosters.forEach((user) => {
        user.per_session_count = this.getFormattedSessionCount(user.per_session_count);
      })
    })

  }


  /**
    * Returns a formatted string that contains the session count to be displayed
    * @param strings The unformatted string
    */
  public getFormattedSessionCount(sessionCount: string): string {



    let formattedSessionCount: string  = "";

    sessionCount.split(',').filter(val => val.trim().length != 0)
                                    .forEach((val) => formattedSessionCount = formattedSessionCount.concat(" ", val))

    return formattedSessionCount;

  }


  /**
    * Method to increase the valueToIncrease by  delta after  secondsToWait  milliseconds
    */
  async  delay(secondsToWait: number, valueToIncrease: number, delta: number ): Promise<number> {
    await new Promise(resolve => setTimeout(resolve, secondsToWait))

    valueToIncrease += delta;

    return Promise.resolve(valueToIncrease);
  }


  /* Method used to bind the ROSTER_HEADER string */
  getRosterHeading(): string {
    return ROSTER_HEADER;
  }

  /* Method used to get the corresponding month name form month number  */
  getMonthFromNumber(month: number | string): string {

    let monthName: string = "";

    if(typeof month === 'string') {
      let numberMonth = Number.parseInt(month);
      if(!isNaN(numberMonth)) {
        month = numberMonth;
      }
    }


    switch(month){
      case 1:
        monthName = "JAN";
        break;
      case 2:
        monthName = "FEB";
        break;
      case 3:
        monthName = "MAR";
        break;
      case 4:
        monthName = "APR";
        break;
      case 5:
        monthName = "MAY";
        break;
      case 6:
        monthName = "JUN";
        break;
      case 7:
        monthName = "JUL";
        break;
      case 8:
        monthName = "AUG";
        break;
      case 9:
        monthName = "SEP";
        break;
      case 10:
        monthName = "OCT";
        break;
      case 11:
        monthName = "NOV";
        break;
      case 12:
        monthName = "DEC";
        break;
      default:
        if(typeof month === 'string') {
          monthName = month;
          break;
        } else {
          monthName = "Invalid Month"
        }

    }
    return monthName;
  }

  /**
    * This method is invoked on View Roster button click
    */
  public viewRoster(uniqueHash:string): void {

    const routeUrl = VIEW_ROSTER_URL + uniqueHash;

    this.router.navigate([routeUrl]);

  }

  /** Method invoked on delete roster click*/
  public deleteRoster(uniqueHash: string): void {
    const routeUrl = CURRENT_ROUTE_URL;
    this.isDeleteClicked = true;
    this.manageRosterService.deleteRoster(uniqueHash).subscribe(
      (res) => {
        this.handleDeleteRoster(uniqueHash);
        this.isDeleteClicked = false;
      },
      (err) => {
        if(err === NOT_FOUND_CLIENT) {
          this.handleDeleteRoster(uniqueHash)
        } else if(TOKEN_EXPIRED_CLIENT === err) {
          this.handleTokenExpired()
        }
        this.isDeleteClicked = false;
      },
    )
  }

  /** Method to handle thea actions for roster deletion */
  private handleDeleteRoster(uniqueHash: string) {
    this.rosterCount -=1;
    this.rostersResponse = this.rostersResponse.filter((roster) => roster.unique_id != uniqueHash)
    this.myRosters = this.myRosters.filter(roster => roster.unique_id != uniqueHash);
    this.rosterListCacheService.resetCache();
    this.rosterListCacheService.initCache(this.rostersResponse)
  }


  public newRoster(): void {

    const routeUrl = NEW_ROSTER_URL;

    this.router.navigate([routeUrl]);
  }

  ngOnDestroy(): void {
      if(this.cacheSubscription != undefined) {
          this.cacheSubscription.unsubscribe()
      }
  }



}
