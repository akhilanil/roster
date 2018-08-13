import { Injectable } from '@angular/core';

import { DateModel } from '@interfaces/business-interface'

@Injectable({
  providedIn: 'root'
})
export class DateUtilsService {

  constructor() { }


  getValidDays( month: number,
                year: number,
                isSaturdayIncluded: boolean,
                isSundayIncluded: boolean): Array<string> {


    var dateList: Array<string>;

    var numberOfDaysInMonth = new Date(year, month, 0).getDate();

    for(var i = 1; i <= numberOfDaysInMonth; i++) {

      var date: string = i + "-" + month + "-" + year;

      var isSaturday: boolean = new Date(year, month-1, i).getDay() != 6

      var isSunday: boolean = new Date(year, month-1, i).getDay() != 0

      if( (isSaturday && isSaturdayIncluded) ||
          (isSunday && isSundayIncluded) ||
          (!isSunday && !isSaturday)) {

            dateList.push(date);
      }
      return dateList;
    }
  }


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
