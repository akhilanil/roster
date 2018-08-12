import { Injectable } from '@angular/core';

import { DateModel } from '@interfaces/business-interface'

@Injectable({
  providedIn: 'root'
})
export class DateUtilsService {

  constructor() { }

  /*
   * This method returns the valid month and year for which rosters can be made.
   * According to the business roster can be prepared in advance for only 6 months
   */
  getValidMonthAndYear(duration: number = 6): Array<DateModel>{

    var currentDate = new Date();
    var month = currentDate.getMonth()
    var year = currentDate.getFullYear()

    var validMonthYearList: Array<DateModel>

    for(var i = 0; i < duration ; i++) {
      var validMonthYearObj = {
        'date': 0,
        'month': month,
        'year': year
      }
      validMonthYearList[i] = validMonthYearObj;
      month++;
      if(month > 12) {
        month = 1
        year++;
      }
    }
    return validMonthYearList;
  }

}
