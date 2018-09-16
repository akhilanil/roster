import { Component, OnInit } from '@angular/core';

/* Custom service imports */
import { ManageRosterService } from '@services/roster';
import { ErrorHandlerService } from '@services/errors';

/* interface imports*/
import { CreateRosterRSModel } from '@interfaces/business-interface'

/* constants import */
import { ROSTER_HEADER } from './constants/ui-constants'
import { TOKEN_EXPIRED_DIALOG_HEADER, TOKEN_EXPIRED_DIALOG_DESCRIPTION } from './constants/ui-constants'
import { VIEW_ROSTER_URL } from './constants/url-constants'
import { TOKEN_EXPIRED_CLIENT, LOGOUT_ACTION } from './constants/data-constants'

import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { SimpleDialogComponent } from '@app/shared/simple-dialog/simple-dialog.component';

@Component({
  selector: 'app-user-rosters',
  templateUrl: './user-rosters.component.html',
  styleUrls: ['./user-rosters.component.css']
})
export class UserRostersComponent implements OnInit {

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

  constructor(
              private manageRosterService: ManageRosterService,
              private router: Router,
              private errorHandler: ErrorHandlerService,
              private dialog: MatDialog
            ) {

    this.isError = false;
    this.isIntialized = false;
    this.progressStatus = 30;

  }

  ngOnInit() {

    this.manageRosterService.getAllRostersOfUser().subscribe(
      (rosters: Array<CreateRosterRSModel>) => {

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

      },
      error => {
        const errorResponse: string = this.errorHandler.getErrorResponse(error);

        if(TOKEN_EXPIRED_CLIENT === errorResponse) {

          const dialogRef = this.dialog.open(SimpleDialogComponent, {width: '250px',
          data: {title: TOKEN_EXPIRED_DIALOG_HEADER, description: TOKEN_EXPIRED_DIALOG_DESCRIPTION, actions: LOGOUT_ACTION}
        });

        }
      }
    )
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

    console.log(routeUrl)


    this.router.navigate([routeUrl]);

  }



}
