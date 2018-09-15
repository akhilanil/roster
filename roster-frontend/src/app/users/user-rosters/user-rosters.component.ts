import { Component, OnInit } from '@angular/core';

/* Custom service imports */
import { ManageRosterService } from '@services/roster';

/* interface imports*/
import { CreateRosterRSModel } from '@interfaces/business-interface'


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

  constructor(private manageRosterService: ManageRosterService) {

    this.isError = false;
    this.isIntialized = false;
    this.progressStatus = 30;

  }

  ngOnInit() {

    this.manageRosterService.getAllRostersOfUser().subscribe(
      (val: Array<CreateRosterRSModel>) => {
        this.delay(2000, this.progressStatus, 40).then(val => this.progressStatus = val);
        this.delay(3000, this.progressStatus, 30).then(val => this.progressStatus = val);
        this.myRosters = val;
        this.isIntialized = true;

      }
    )

  }

  /* Method to increase the @param  valueToIncrease by @ delta after @param secondsToWait  milliseconds */
  async  delay(secondsToWait: number, valueToIncrease: number, delta: number ): Promise<number> {
    await new Promise(resolve => setTimeout(resolve, secondsToWait))

    valueToIncrease += delta;

    return Promise.resolve(valueToIncrease);
  }




}
