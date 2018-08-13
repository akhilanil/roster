import { Component, OnInit } from '@angular/core';


import {FormControl, Validators} from '@angular/forms';

/* UI Constant imports */
import { INITIAL_STEP_LABEL } from './constants/ui-constants'
import { TITLE_INPUT_LABEL, TITLE_INPUT_ERROR_MAXLEN, TITLE_INPUT_ERROR_REQUIRED } from './constants/ui-constants'
import { YEAR_SELECT_LABEL, YEAR_SELECT_ERROR_REQUIRED } from './constants/ui-constants';
import { MONTH_SELECT_LABEL, MONTH_SELECT_ERROR_REQUIRED } from './constants/ui-constants'
import { SUNDAYS_INCLUDED_LABEL, SATURDAYS_INCLUDED_LABEL } from './constants/ui-constants'
import { YEAR_SELECT_ARIA_LABEL, MONTH_SELECT_ARIA_LABEL } from './constants/ui-constants'
import { HOLIDAYS_SELECT_LABEL } from './constants/ui-constants'

/* Custom service imports */
import { DateUtilsService } from '@services/utils';

/* Interface imports */
import { DateModel } from '@interfaces/business-interface'
import { MatSlideToggleChange, MatSelectChange } from '@angular/material';


@Component({
  selector: 'app-roster-input',
  templateUrl: './roster-input.component.html',
  styleUrls: ['./roster-input.component.css']
})
export class RosterInputComponent implements OnInit {

  /* Label for first stepper */
  initStepLabel: string;

  /* Label and form control for title input field */
  titleInputLabel: string;
  titleControl: FormControl;

  /* Values to be set in year drop down list */
  yearDropDown: Array<{name: string, value: number}>;
  yearControl: FormControl;
  yearLabel: string;
  yearAriaLabel: string;


  /* Values to be set in month drop down list */
  monthDropDown: Array<{name: string, value: number}>;
  monthControl: FormControl;
  monthLabel: string;
  monthAriaLabel: string;

  /* Labels and values for slide toggle */
  sundaysIncludedLabel: string;
  saturdaysIncludedLabel: string;
  isSaturdayIncluded: boolean;
  isSundayIncluded: boolean;

  /* Values to be set in month drop down list */
  holidaysDropDown: Array<{name: string, value: string}>;
  holidayControl: FormControl;
  holidayLabel: string;





  constructor(private dateUtilService: DateUtilsService) {

    this.initStepLabel = INITIAL_STEP_LABEL;
    this.titleInputLabel = TITLE_INPUT_LABEL;
    this.yearLabel = YEAR_SELECT_LABEL;
    this.monthLabel = MONTH_SELECT_LABEL;
    this.sundaysIncludedLabel = SUNDAYS_INCLUDED_LABEL;
    this.saturdaysIncludedLabel = SATURDAYS_INCLUDED_LABEL;
    this.monthAriaLabel = MONTH_SELECT_ARIA_LABEL;
    this.yearAriaLabel = YEAR_SELECT_ARIA_LABEL;
    this.holidayLabel = HOLIDAYS_SELECT_LABEL;
  }

  ngOnInit( ) {

    this.prepareYearAndMonthDropDown(this.dateUtilService.getValidMonthAndYear());


  }


  /* Method to get title error message */
  getTitleErrroMessage(): string {
    if(this.titleControl.hasError('required')) {
      return TITLE_INPUT_ERROR_REQUIRED
    } else {
      return TITLE_INPUT_ERROR_MAXLEN
    }
  }


  /* Method to get year error message */
  getYearErrroMessage(): string {
    return YEAR_SELECT_ERROR_REQUIRED;
  }

  /* Method to get month error message */
  getMonthErrroMessage(): string {
    return MONTH_SELECT_ERROR_REQUIRED
  }



  /* Method to set year and month drop down  */
  prepareYearAndMonthDropDown(dateModels: Array<DateModel>): void {

    var yearCounter: number = 0;
    var monthCounter: number = 0;
    var counter: number = 0;


    var yearList: Array<number>;
    var monthList: Array<number>;

    for(let dateModel of dateModels) {
      yearList[counter] = dateModel.year;
      monthList[counter] = dateModel.month
      counter++;
    }

    yearList = yearList.filter((element, index, yearArray) => index === yearArray.indexOf(element))
    console.log("YEAR", yearList)

    yearList.forEach(year =>{
        this.yearDropDown.push({
          'name': year.toString(),
          'value': year
        });
    });

    monthList.forEach(month =>{
        this.monthDropDown.push({
          'name': month.toString(),
          'value': month
        });
    });
  }


  /* Method invoked when year or month select is changed  */
  yearOrMonthSelect(event: MatSelectChange) {

    var year = this.monthControl.value;
    var month = this.yearControl.value;
    this.updateHolidayList(year, month, this.isSaturdayIncluded, this.isSundayIncluded);

  }


  /* Method invoked when saturday or sunday slider is toggled  */
  weekendSlideToggle(event: MatSlideToggleChange) {

    var year = this.monthControl.value;
    var month = this.yearControl.value;
    this.updateHolidayList(year, month, this.isSaturdayIncluded, this.isSundayIncluded);

  }


  updateHolidayList(year: number, month: number, isSaturdayIncluded: boolean, isSundayIncluded:boolean) {

    var dateList: Array<string> =
                    this.dateUtilService.getValidDays(year, month,
                              isSaturdayIncluded, isSundayIncluded);


    dateList.forEach( date => {

      this.holidaysDropDown.push({
        'name': date,
        'value': date
      })
    });
  }
}
