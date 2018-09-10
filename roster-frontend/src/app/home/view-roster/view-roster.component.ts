import { Component, OnInit } from '@angular/core';

/* Custom Service imports */
import { ManageRosterService } from '@services/roster';
import {  DateUtilsService } from '@services/utils';

/* Interface imports */
import { CreateRosterRSModel } from '@interfaces/business-interface'
import { DateModel } from '@interfaces/business-interface'

@Component({
  selector: 'app-view-roster',
  templateUrl: './view-roster.component.html',
  styleUrls: ['./view-roster.component.css']
})
export class ViewRosterComponent implements OnInit {


  private displayRoster: CreateRosterRSModel;

  constructor(
                private manageRosterService: ManageRosterService,
                private dateUtilService: DateUtilsService
              ) { }

  ngOnInit() {

    this.manageRosterService.currentRoster.subscribe((message: CreateRosterRSModel) => {
      this.displayRoster = message;
      if(this.displayRoster) {
          this.updateViewRoster();
      }

    })
  }


  private updateViewRoster(): void {

    let year: string|number = this.displayRoster.year;
    let month: string|number = this.displayRoster.month;

    if(typeof year === 'string') {
      year = Number.parseInt(year);
    }
    if(typeof month === 'string') {
      month = Number.parseInt(month);
    }


    this.dateUtilService.getAllDaysOfMonth(month, year);



  }

}
