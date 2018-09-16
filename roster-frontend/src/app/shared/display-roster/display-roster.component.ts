import { Component, OnInit, Inject } from '@angular/core';

/* Custom Service imports */
import { ManageRosterService } from '@services/roster';
import {  DateUtilsService } from '@services/utils';

/* Interface imports */
import { CreateRosterRSModel, ParticipantRSModel } from '@interfaces/business-interface'
import { DateModel } from '@interfaces/business-interface'
import { DisplayRosterModel } from '@interfaces/ui-interface'

import { MatBottomSheet, MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material';



@Component({
  selector: 'app-display-roster',
  templateUrl: './display-roster.component.html',
  styleUrls: ['./display-roster.component.css']
})
export class DisplayRosterComponent implements OnInit {

  /* Response received from server */
  private displayRoster: CreateRosterRSModel;

  /* Data to display */
  private rosterData: Array<Array<DisplayRosterModel>>;


  constructor(
                private manageRosterService: ManageRosterService,
                private dateUtilService: DateUtilsService,
                private bottomSheet: MatBottomSheet
  ) {


  }

  ngOnInit() {
    this.manageRosterService.currentRoster.subscribe((message: CreateRosterRSModel) => {
      this.displayRoster = message;

      if(typeof this.displayRoster != 'string' && this.displayRoster.toString() != 'No Data') {
          this.updateViewRoster();
      }

    })
  }

  /* Entry Mehtod for the component. invoked from ngOnInit */
  private updateViewRoster(): void {

    this.prepareDisplaySkelton();

    let year: string|number = this.displayRoster.year;
    let month: string|number = this.displayRoster.month;

    if(typeof year === 'string') {
      year = Number.parseInt(year);
    }
    if(typeof month === 'string') {
      month = Number.parseInt(month);
    }


    let dateModels: Array<DateModel> = this.dateUtilService.getAllDaysOfMonth(month, year);

    this.insertDateModels(dateModels);

    let participantModel : Array<ParticipantRSModel> = this.displayRoster.user_rosters
    this.insertParticipantRSModel(participantModel);

    console.log(JSON.stringify(this.rosterData));

  }

  /* Method to insert ParticipantRSModel to rosterData */
  private insertParticipantRSModel(participantModels : Array<ParticipantRSModel>) {

    let dateParticipantMap: Map<number, Map<string, string>> = new Map<number, Map<string, string>>();

    participantModels.forEach((participantModel) => {

      let participantName = participantModel.participant_name;
      let participantSessionMap = new Map<string, string>();
      let sessionDates: Array<string> = participantModel.participant_dates.split(',');

      sessionDates.forEach(sessionDate => {
        if(sessionDate.trim().length != 0) {
          let sessionName: string = sessionDate.split(':')[0];
          let date: number = Number.parseInt(sessionDate.split(':')[1]);

          let nameSessionMap: Map<string, string>;

          if(dateParticipantMap.has(date)) {
            nameSessionMap = dateParticipantMap.get(date);
          } else {
            nameSessionMap = new Map<string, string>();
            dateParticipantMap.set(date, nameSessionMap);
          }
          nameSessionMap.set(participantName, sessionName);
        }
      });
    });

    this.rosterData.forEach(weekRoster => {
      weekRoster.filter((displayRosterModel: DisplayRosterModel) => displayRosterModel.isValid)
                .forEach((displayRosterModel: DisplayRosterModel) => {
                    let key = displayRosterModel.calendar.date;
                    if(dateParticipantMap.has(key)) {
                        displayRosterModel.participantSessionMap = dateParticipantMap.get(key);
                    } else {
                      displayRosterModel.isHoliday = true;
                    }
      })
    })

  }

  /* Method to insert DateModels to rosterData */
  private insertDateModels(dateModels: Array<DateModel>) {

    let startDay = 0;
    let weekCounter = 0;
    let dateModelCounter = 0;
    let dateModelLength = dateModels.length;
    let hasFirstDateFound: boolean = false;
    let dayNameMap: Map<number, string> = this.dateUtilService.getDayNameMap();

    while (weekCounter < 6 && dateModelCounter < dateModelLength) {
      let weekArray: Array<DisplayRosterModel> = this.rosterData[weekCounter];
      while(startDay < 7 && dateModelCounter < dateModelLength) {

        if(hasFirstDateFound) {
            let displayRosterModel: DisplayRosterModel = weekArray[startDay];
            displayRosterModel.calendar = dateModels[dateModelCounter];
            displayRosterModel.isValid = true;
            displayRosterModel.isHoliday = false;
            dateModelCounter++;

        } else {
          if(dateModels[dateModelCounter].day.toUpperCase() ===  dayNameMap.get(startDay)) {
            hasFirstDateFound = true;
          }
        }
        startDay++;

      }
      startDay = 0;
      weekCounter++;
    }

  }


  /* Method to initialize rosterData  */
  private prepareDisplaySkelton(): void {
    this.rosterData = new  Array<Array<DisplayRosterModel>>();
    for (let i = 0; i < 6; i++) {
      let weekArray: Array<DisplayRosterModel> = new Array<DisplayRosterModel>();
      for (let j = 0; j < 7; j++) {
        let displayRosterModel: DisplayRosterModel = {
          isValid: false
        }
        weekArray.push(displayRosterModel)
      }
      this.rosterData.push(weekArray)
    }
  }


  openRosterInBottomSheet(participantSessionMap: Map<string, string>) {
    let dataToDisplay: Array<{name: string, session: string}> = new Array<{name: string, session: string}>();
    participantSessionMap.forEach((key, value) => {
      let data = {
        'name': key,
        'session': value
      }
      dataToDisplay.push(data);
    })
    this.bottomSheet.open(RosterSheetComponent, {data: dataToDisplay})
  }

  /* Method used to get the corresponding month name form month number  */
  getMonthFromNumber(month: number): string {

    let monthName: string = "";

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
    }
    return monthName;
  }


}

@Component({
  selector: 'roster-sheet',
  templateUrl: './roster-sheet.html',
  styleUrls: ['./roster-sheet.css']

})
export class RosterSheetComponent {
  constructor(private bottomSheetRef: MatBottomSheetRef<RosterSheetComponent>,
  @Inject(MAT_BOTTOM_SHEET_DATA) public data: any) {}

  openLink(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
