import { Injectable } from '@angular/core';

import { DateModel } from '@interfaces/business-interface'

@Injectable({
  providedIn: 'root'
})
export class DateUtilsService {

  constructor() { }

  /* Return the days of month */
  getValidDays( month: number,
                year: number,
                isSaturdayIncluded: boolean,
                isSundayIncluded: boolean): Array<string> {

    // month = month - 1;

    var dateList: Array<string> = new Array<string>();

    var numberOfDaysInMonth = new Date(year, month, 0).getDate();

    for(var i = 1; i <= numberOfDaysInMonth; i++) {

      var date: string = year + "-" + (month ) + "-" + i;

      var isSaturday: boolean = new Date(year, month-1, i).getDay() == 6

      var isSunday: boolean = new Date(year, month-1, i).getDay() == 0

      if( (isSaturday && isSaturdayIncluded) ||
          (isSunday && isSundayIncluded) ||
          (!isSunday && !isSaturday)) {

            dateList.push(date);
      }
    }

    return dateList;
  }


  /* Method to get all dates of month. Array of DateModel is returned. */
  public getAllDaysOfMonth(month: number, year: number): Array<DateModel> {

    let allDays: Array<DateModel> = new Array<DateModel>();

    var numberOfDaysInMonth = new Date(year, month, 0).getDate();

    let dayNameMap: Map<number, string> = this.getDayNameMap();

    for(let i = 0; i < numberOfDaysInMonth; i++) {

      let dayName: string = dayNameMap.get(new Date(year, month-1, i).getDay())

      let dateModel: DateModel = {
        date: i,
        month: month,
        year: year,
        day: dayName
      }
      allDays.push(dateModel);
    }
    return allDays;
  }


  /* Returns a map having day number as key and day name as value   */
  private getDayNameMap(): Map<number, string> {

    let dayNameMap: Map<number, string> = new Map<number, string>();

    dayNameMap.set(0, 'SUNDAY')
    dayNameMap.set(1, 'MONDAY')
    dayNameMap.set(2, 'TUESDAY')
    dayNameMap.set(3, 'WEDNESDAY')
    dayNameMap.set(4, 'THURSDAY')
    dayNameMap.set(5, 'FRIDAY')
    dayNameMap.set(6, 'SATURDAY')


    return dayNameMap;
  }


  /*
   * This method returns the valid month and year for which rosters can be made.
   * According to the business roster can be prepared in advance for only 6 months
   */
  getValidMonthAndYear(duration: number = 6): Array<DateModel>{

    var currentDate = new Date();
    var month = currentDate.getMonth() + 1;
    var year = currentDate.getFullYear()

    var validMonthYearList: Array<DateModel> = new Array<DateModel>();

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



  /*
   * This service method is invoked to prepare saturday list for create roster request
   */
  prepareSaturdayListForRequest(isSaturdayIncluded: boolean, holidayList: Array<string>,
                                year: number, month: number): Array<boolean> {

    var saturdayList: Array<boolean>;
    var all_dates = this.getValidDays(month, year, true, false)

    if(!isSaturdayIncluded) {

      saturdayList = all_dates.filter((dates) => {
        var dateSplit: Array<string> = dates.split("-");
        return new Date(
                  Number.parseInt(dateSplit[0]),
                  Number.parseInt(dateSplit[1])-1,
                  Number.parseInt(dateSplit[2])
                ).getDay() === 6
      }).map((filteredDate) => {return false})

    } else {
      saturdayList = all_dates.filter((dates) => {
        var dateSplit: Array<string> = dates.split("-");
        return new Date(
                  Number.parseInt(dateSplit[0]),
                  Number.parseInt(dateSplit[1])-1,
                  Number.parseInt(dateSplit[2])
                ).getDay() === 6
      }).map((filteredDate) => {
        if (holidayList.findIndex(holiday => holiday === filteredDate)!=-1){
          return false;
        } else {
          return true;
        }
      });
    }
    return saturdayList;
  }


}
