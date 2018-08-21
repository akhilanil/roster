import { Component, OnInit } from '@angular/core';
import { MatSlideToggleChange, MatSelectChange } from '@angular/material';

import {FormControl, Validators, FormGroup, FormBuilder} from '@angular/forms';

/* UI Constant imports */
import { INITIAL_STEP_LABEL } from './constants/ui-constants'
import { TITLE_INPUT_LABEL, TITLE_INPUT_ERROR_MAXLEN, TITLE_INPUT_ERROR_REQUIRED } from './constants/ui-constants'
import { YEAR_SELECT_LABEL, YEAR_SELECT_ERROR_REQUIRED } from './constants/ui-constants';
import { MONTH_SELECT_LABEL, MONTH_SELECT_ERROR_REQUIRED } from './constants/ui-constants'
import { SUNDAYS_INCLUDED_LABEL, SATURDAYS_INCLUDED_LABEL } from './constants/ui-constants'
import { YEAR_SELECT_ARIA_LABEL, MONTH_SELECT_ARIA_LABEL } from './constants/ui-constants'
import { HOLIDAYS_SELECT_LABEL } from './constants/ui-constants'
import { SESSION_NUM_SELECT_LABEL, PARTICIPANT_NUM_SELECT_LABEL } from './constants/ui-constants'
import { SESSION_SELECT_ERROR_REQUIRED, PARTICIPANT_SELECT_ERROR_REQUIRED } from './constants/ui-constants'



/* Business Constant imports */
import { MAX_PARTICIPANTS, MAX_SESSIONS } from '@constants/business/general-constants'


/* Custom service imports */
import { DateUtilsService } from '@services/utils';

/* Interface imports */
import { DateModel } from '@interfaces/business-interface'
import { CreateRosterRQModel, ParticipantModel, LeaveSessionModel} from '@interfaces/business-interface'





@Component({
  selector: 'app-roster-input',
  templateUrl: './roster-input.component.html',
  styleUrls: ['./roster-input.component.css']
})
export class RosterInputComponent implements OnInit {

  /* Form groups */
  initalFormGroup: FormGroup;


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

  /* Label and values to be set in session dropdown */
  totalSessionDropDown: Array<{name: string, value: number}>;
  totalSessionControl: FormControl;
  totalSessionLabel: string

  /* Label and values to be set in participant dropdown */
  totalParticipantDropDown: Array<{name: string, value: number}>;
  totalParticipantControl: FormControl;
  totalParticipaLabel: string

  /* Array consisting of dateModels  */
  dateModels: Array<DateModel>

  /* Create Roster Request Models */
  createRosterRQModel: CreateRosterRQModel;
  participantModel: ParticipantModel;
  leaveSessionModel: LeaveSessionModel;


  constructor(private dateUtilService: DateUtilsService,
              private formBuilder: FormBuilder) {

    this.initStepLabel = INITIAL_STEP_LABEL;
    this.titleInputLabel = TITLE_INPUT_LABEL;
    this.yearLabel = YEAR_SELECT_LABEL;
    this.monthLabel = MONTH_SELECT_LABEL;
    this.sundaysIncludedLabel = SUNDAYS_INCLUDED_LABEL;
    this.saturdaysIncludedLabel = SATURDAYS_INCLUDED_LABEL;
    this.monthAriaLabel = MONTH_SELECT_ARIA_LABEL;
    this.yearAriaLabel = YEAR_SELECT_ARIA_LABEL;
    this.holidayLabel = HOLIDAYS_SELECT_LABEL;

    this.totalSessionLabel = SESSION_NUM_SELECT_LABEL,
    this.totalParticipaLabel = PARTICIPANT_NUM_SELECT_LABEL;

    this.totalSessionDropDown = this.prepareNumberDropDown(1, MAX_SESSIONS);


    /* Intialise Controllers */
    this.initFromConroller()

    /* Intialise arrays for dropdown */
    this.yearDropDown         = new Array<{name: string, value: number}>();
    this.holidaysDropDown     = new Array<{name: string, value: string}>();
    this.monthDropDown        = new Array<{name: string, value: number}>();

    /* Setting slide toggles to false */
    this.isSaturdayIncluded = this.isSundayIncluded = false ;

  }

  ngOnInit( ) {

    this.prepareYearAndMonthDropDown(this.dateUtilService.getValidMonthAndYear());

    this.initalFormGroup = this.formBuilder.group({
      tc: this.titleControl,
      yc: this.yearControl,
      mc: this.monthControl,
      hc: this.holidayControl,
      tpc: this.totalParticipantControl,
      tsc: this.totalSessionControl,
      saturdayToggle: new FormControl('',[Validators.required]).setValue(false),
      sundayToggle: new FormControl('',[Validators.required]).setValue(false)
    })

  }


  /* Mehtod to initialise all Form controllers */
  private initFromConroller(): void {
    this.titleControl = new FormControl('', [Validators.required, Validators.maxLength(14)]);
    this.yearControl = new FormControl('', [Validators.required]);
    this.monthControl = new FormControl('', [Validators.required]);

    this.holidayControl = new FormControl('');
    this.totalParticipantControl = new FormControl('', [Validators.required]);
    this.totalSessionControl = new FormControl('', [Validators.required]);

    this.monthControl.disable();
    this.totalParticipantControl.disable();
  }




  /* Returns the array used to prepare arrays for participant and session dropdowns */
  private prepareNumberDropDown(minValue: number, maxValue: number ): Array<{name: string, value: number}> {

    var dropDownArray: Array<{name: string, value: number}> = new Array();
    for (var i = minValue; i <= maxValue; i++) {
      dropDownArray.push({
        'name': i.toString(),
        'value': i
      })
    }

    return  dropDownArray;

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
  getYearErrorMessage(): string {
    return YEAR_SELECT_ERROR_REQUIRED;
  }

  /* Method to get month error message */
  getMonthErrorMessage(): string {
    return MONTH_SELECT_ERROR_REQUIRED
  }

  /* Method to get participant error message */
  getParticipantErrorMessage(): string {
    return PARTICIPANT_SELECT_ERROR_REQUIRED;
  }

  /* Method to get session error message */
  getSessionErrorMessage(): string {
    return SESSION_SELECT_ERROR_REQUIRED
  }



  /* Method to set year and month drop down  */
  prepareYearAndMonthDropDown(dateModels: Array<DateModel>): void {

    this.dateModels = dateModels;

    this.yearDropDown =
            this.dateModels.filter((element, index, modelArray) => {
              return modelArray.map( arrayObj => arrayObj.year).indexOf(element.year) === index
            }).map((dateModel) => {
              return {
                'name': dateModel.year.toString(),
                'value':dateModel. year
              }
            });

  }


  /* Method to set values to month drop down */
  setMonthDropDown(year: number): void {

    this.monthDropDown =
        this.dateModels.filter(dateModel =>  dateModel.year === year ).map((dateModel) => {
          return {
            'name': dateModel.month.toString(),
            'value':dateModel. month
          }
        });

  }

  /* Method invoked when year or month select is changed  */
  yearOrMonthSelect(event: MatSelectChange) {

    var year = this.yearControl.value;

    if(event.source.ariaLabel=== this.yearAriaLabel)
      this.setMonthDropDown(year);

    if(this.monthControl.disabled) {
      this.monthControl.enable();
    }
    else {
      var month = this.monthControl.value;

      this.updateHolidayList(year, month, this.isSaturdayIncluded, this.isSundayIncluded);
    }



  }


  /* Method invoked when saturday or sunday slider is toggled  */
  weekendSlideToggle(event: MatSlideToggleChange) {

    this.isSundayIncluded = this.initalFormGroup.controls['sundayToggle'].value? true: false;
    this.isSaturdayIncluded = this.initalFormGroup.controls['saturdayToggle'].value ? true : false;

    var month = this.monthControl.value;
    var year = this.yearControl.value;


    this.updateHolidayList(year, month, this.isSaturdayIncluded, this.isSundayIncluded);

  }


  updateHolidayList(year: number, month: number, isSaturdayIncluded: boolean, isSundayIncluded:boolean) {

    if(!(this.yearControl.dirty && this.monthControl.dirty)) {
      return;
    }


    var dateList: Array<string> =
                    this.dateUtilService.getValidDays(month, year,
                              isSaturdayIncluded, isSundayIncluded);


    this.holidaysDropDown = [];
    dateList.forEach( date => {

      this.holidaysDropDown.push({
        'name': date,
        'value': date
      })
    });
  }


  private initRequestModelSkelton(_title: string, _year: number, _month: number,
                          _numberOfSessions: number, _saturdaysIncluded: Array<boolean>,
                          _isSundayIncluded:boolean, _holidays: Array<string>) {

    this.createRosterRQModel = {
      title: _title,
      rosterForYear: _year,
      rosterForMonth: _month,
      sessionNames: [],
      numberOfSessions: _numberOfSessions,
      saturdaysIncluded: _saturdaysIncluded,
      isSundayIncluded: _isSundayIncluded,
      holidays: _holidays,
      participants: []

    };
  }

  onSessionSelected() {
    this.totalParticipantControl.enable();
    this.totalParticipantDropDown = this.prepareNumberDropDown(this.totalSessionControl.value, MAX_PARTICIPANTS);
  }


  onInitSubmit() {

    var title = this.titleControl.value;
    var year = this.yearControl.value;
    var month = this.monthControl.value;
    var numberOfSessions = this.totalSessionControl.value;
    var isSundayIncluded = this.isSundayIncluded;
    var isSaturdayIncluded = this.isSaturdayIncluded
    var holidays = this.holidayControl.value;


    var saturdaysIncluded =
          this.dateUtilService.prepareSaturdayListForRequest( isSaturdayIncluded,
                                                              holidays,
                                                              year, month);

    this.initRequestModelSkelton(title, year, month,
            numberOfSessions, saturdaysIncluded, isSundayIncluded, holidays)


    // console.log(this.createRosterRQModel)

  }





}
