import { Component, OnInit } from '@angular/core';
import { MatSlideToggleChange, MatSelectChange } from '@angular/material';

import {FormControl, Validators, FormGroup, FormBuilder} from '@angular/forms';

/* UI Constant imports */
import { INITIAL_STEP_LABEL, SECOND_STEP_LABEL, FINAL_STEP_LABEL } from './constants/ui-constants'
import { TITLE_INPUT_LABEL, TITLE_INPUT_ERROR_MINLEN, TITLE_INPUT_ERROR_REQUIRED } from './constants/ui-constants'
import { YEAR_SELECT_LABEL, YEAR_SELECT_ERROR_REQUIRED } from './constants/ui-constants';
import { MONTH_SELECT_LABEL, MONTH_SELECT_ERROR_REQUIRED } from './constants/ui-constants'
import { SUNDAYS_INCLUDED_LABEL, SATURDAYS_INCLUDED_LABEL } from './constants/ui-constants'
import { YEAR_SELECT_ARIA_LABEL, MONTH_SELECT_ARIA_LABEL } from './constants/ui-constants'
import { HOLIDAYS_SELECT_LABEL } from './constants/ui-constants'
import { SESSION_NUM_SELECT_LABEL, PARTICIPANT_NUM_SELECT_LABEL } from './constants/ui-constants'
import { SESSION_SELECT_ERROR_REQUIRED, PARTICIPANT_SELECT_ERROR_REQUIRED } from './constants/ui-constants'
import { PARTICIPANT_INPUT_LABEL, PARTICIPANT_INPUT_ERROR_REQUIRED, PARTICIPANT_INPUT_ERROR_MINLEN } from './constants/ui-constants'
import { SESSION_INPUT_LABEL, SESSION_INPUT_ERROR_REQUIRED, SESSION_INPUT_ERROR_MINLEN } from './constants/ui-constants'
import { INVALID_INPUT } from './constants/ui-constants'



/* Business Constant imports */
import { MAX_PARTICIPANTS, MAX_SESSIONS } from '@constants/business/general-constants'


/* Custom service imports */
import { DateUtilsService } from '@services/utils';
import { ManageRosterService } from '@services/roster';

/* Interface imports */
import { DateModel } from '@interfaces/business-interface'
import { CreateRosterRQModel, ParticipantModel, LeaveSessionModel} from '@interfaces/business-interface'
import { CreateRosterRSModel } from '@interfaces/business-interface'

/* Validator class import */
import {RosterInputValidator} from './roster-input-validator'



@Component({
  selector: 'app-roster-input',
  templateUrl: './roster-input.component.html',
  styleUrls: ['./roster-input.component.css']
})
export class RosterInputComponent implements OnInit {

  /* Form groups */
  initalFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  /* Label for first stepper */
  initStepLabel: string;
  secondStepLabel: string;
  finalStepLabel: string;

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

  totalParticipants = [];
  totalSessions = [];

  /* Participant and session labels */
  participantLabel: string;
  sessionLabel: string;

  isFirstStepperCompleted: boolean;
  isSecondStepperCompleted: boolean;


  /* Participant names */
  participantNames: Array<string>

  /* Session names */
  sessionNames: Array<string>


  /* Working Days */
  workingDays: Array<string>

  /* Leave Session Group */
  leaveSessionGroup: Array<{date: string, sessions: Array<{name: string, value: string}>}>

  participantLeaveDynamicStepperBuilder: Array<
                                  {
                                    participantName: string,
                                    leaveDropDownGroup: Array<{date: string, sessions: Array<{name: string, value: string}>}>,
                                    leaveControlName: string,
                                  }>


  constructor(private dateUtilService: DateUtilsService,
              private manageRosterService: ManageRosterService,
              private formBuilder: FormBuilder) {

    this.initStepLabel = INITIAL_STEP_LABEL;
    this.secondStepLabel = SECOND_STEP_LABEL;
    this.finalStepLabel = FINAL_STEP_LABEL;

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

    this.participantLabel = PARTICIPANT_INPUT_LABEL;
    this.sessionLabel = SESSION_INPUT_LABEL;

    this.totalSessionDropDown = this.prepareNumberDropDown(1, MAX_SESSIONS);


    /* Intialise Controllers */
    this.initFromConroller()

    /* Intialise arrays for dropdown */
    this.yearDropDown         = new Array<{name: string, value: number}>();
    this.holidaysDropDown     = new Array<{name: string, value: string}>();
    this.monthDropDown        = new Array<{name: string, value: number}>();

    this.participantNames = new Array<string>();
    this.sessionNames = new Array<string>();


    this.leaveSessionGroup = new Array();
    this.participantLeaveDynamicStepperBuilder = new Array();




    /* Setting slide toggles to false */
    this.isSaturdayIncluded = this.isSundayIncluded = false ;

    this.isFirstStepperCompleted = false;
    this.isSecondStepperCompleted = false;


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

    this.secondFormGroup = this.formBuilder.group({});
    this.thirdFormGroup = this.formBuilder.group({});

  }


  /* Mehtod to initialise all Form controllers */
  private initFromConroller(): void {
    this.titleControl = new FormControl('', [Validators.required, Validators.maxLength(14), Validators.minLength(4), Validators.pattern('^[a-zA-Z][a-zA-Z ]*[a-zA-Z]$')]);
    this.yearControl = new FormControl('', [Validators.required]);
    this.monthControl = new FormControl('', [Validators.required]);

    this.holidayControl = new FormControl('');
    this.totalParticipantControl = new FormControl('', [Validators.required]);
    this.totalSessionControl = new FormControl('', [Validators.required]);

    this.monthControl.disable();
    this.totalParticipantControl.disable();
    this.holidayControl.disable();
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
    } else if(this.titleControl.hasError('minlength')) {
      return TITLE_INPUT_ERROR_MINLEN
    } else {
      return INVALID_INPUT;
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

    if(event.source.ariaLabel=== this.yearAriaLabel) {
        this.setMonthDropDown(year);
        this.holidayControl.disable();
        this.monthControl.enable();
        this.monthControl.reset();
    }else {
      var month = this.monthControl.value;

      this.updateHolidayList(year, month, this.isSaturdayIncluded, this.isSundayIncluded);
      this.holidayControl.enable();
      this.holidayControl.reset();
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

  onYearSelected() {

  }

  onSessionSelected() {
    //this.totalParticipantControl.markAsDirty();

    this.totalParticipantDropDown = this.prepareNumberDropDown(this.totalSessionControl.value, MAX_PARTICIPANTS);
    this.totalParticipantControl.enable();
    this.totalParticipantControl.reset();
  }


  onInitSubmit() {

    var title: string = this.titleControl.value.trim().toUpperCase();
    var year = this.yearControl.value;
    var month = this.monthControl.value;
    var numberOfSessions = this.totalSessionControl.value;
    var isSundayIncluded = this.isSundayIncluded;
    var isSaturdayIncluded = this.isSaturdayIncluded
    var holidays = this.holidayControl.value ? this.holidayControl.value : [];
    let totalParticipants = this.totalParticipantControl.value;
    let totalSessions = this.totalSessionControl.value;

    var saturdaysIncluded =
          this.dateUtilService.prepareSaturdayListForRequest( isSaturdayIncluded,
                                                              holidays, year, month);
    this.workingDays = this.prepareWorkingDays(this.holidaysDropDown, holidays);

    this.initRequestModelSkelton(title, year, month,
            numberOfSessions, saturdaysIncluded, isSundayIncluded, holidays)

    this.builSessionAndParticipantInput(totalParticipants, totalSessions)

    this.createRestFormGroup(totalParticipants, totalSessions)

    this.isFirstStepperCompleted = true;

  }

  prepareWorkingDays(holidaysDropDown: Array<{name: string, value: string}>, holidays: Array<string>) {

    return holidaysDropDown.filter((days) => !holidays.includes(days.value))
                    .map(days => days.value)

  }



  builSessionAndParticipantInput(totalParticipants: number, totalSessions: number) {
    this.totalParticipants = [];
    this.totalSessions = [];

    for(var i = 1; i <= totalParticipants; i++) {

      this.totalParticipants.push( {
        "formControlName": 'participant'+i,
        "displayLabel": this.participantLabel+ ' ' + i,
        "isValid": true
      });
    }

    for(var i = 1; i <= totalSessions; i++) {

      this.totalSessions.push( {
        "formControlName": 'session'+i,
        "displayLabel": this.sessionLabel+ ' ' + i
      });
    }

  }

  /*
   * Rest form groups can be created using participant and sesion number
   */
  createRestFormGroup(totalParticipants: number, totalSessions: number) {
    for(var i = 1; i <= totalParticipants; i++) {
      this.secondFormGroup.addControl('participant'+i,  new FormControl('',
                                                    [ Validators.required,
                                                      Validators.maxLength(14),
                                                      Validators.minLength(4),
                                                      Validators.pattern('^[a-zA-Z][a-zA-Z ]*[a-zA-Z]$'),
                                                      RosterInputValidator.checkForNameConflicts(this.secondFormGroup),
                                                      RosterInputValidator.checkForDuplicates(this.secondFormGroup, 'participant')]))
      this.thirdFormGroup.addControl('participant'+i,  new FormControl(''))
    }

    for(var i = 1; i <= totalSessions; i++) {
      this.secondFormGroup.addControl('session'+i,  new FormControl('',
                                                [ Validators.required,
                                                  Validators.maxLength(14),
                                                  Validators.minLength(4),
                                                  Validators.pattern('^[a-zA-Z][a-zA-Z ]*[a-zA-Z]$'),
                                                  RosterInputValidator.checkForNameConflicts(this.secondFormGroup),
                                                  RosterInputValidator.checkForDuplicates(this.secondFormGroup, 'session')]))
    }

  }


  getSessionRequiredErrorMessage(): string {
    return SESSION_INPUT_ERROR_REQUIRED;
  }

  getSessionLengthErrorMessage(): string {
    return SESSION_INPUT_ERROR_MINLEN;
  }

  getParticipantRequiredErrorMessage(): string {
    return PARTICIPANT_INPUT_ERROR_REQUIRED;
  }

  getParticipantLengthErrorMessage(): string {
    return PARTICIPANT_INPUT_ERROR_MINLEN;
  }

  getInvalidInputMessage(): string {
    return INVALID_INPUT;
  }

  onSecondSubmit() {

    this.participantNames = [];
    this.totalParticipants.forEach((participants) => {
      this.participantNames.push(this.secondFormGroup.controls[participants.formControlName].value.trim().toUpperCase())


    });
    this.sessionNames = [];
    this.totalSessions.forEach((sessions) => {
      this.sessionNames.push(this.secondFormGroup.controls[sessions.formControlName].value.trim().toUpperCase())
    })

    this.createRosterRQModel.sessionNames = this.sessionNames;
    this.createRosterRQModel.numberOfSessions = this.sessionNames.length;

    this.leaveSessionGroup = [];

    this.buildLeaveSessionGroup();

    this.participantLeaveDynamicStepperBuilder = []
    this.buildParticipantLeaveDynamicStepperBuilder()

    //RosterInputValidator.checkForDuplictaes(  this.participantNames)

    this.isSecondStepperCompleted = true;
  }

  /* Method to build contents for Leave Session dropdown */
  buildLeaveSessionGroup() {

    this.workingDays.forEach(
      workingDay => {
        let sessions: Array<{name: string, value: string}> = new Array<{name: string, value: string}>()

        this.sessionNames.forEach((sessionName) => {
          sessions.push({
            'name': sessionName,
            'value': sessionName +'#'+ workingDay
          })
        })

        this.leaveSessionGroup.push(
          {
            'date': workingDay,
            'sessions':sessions
          }
        )
      });
  }

  buildParticipantLeaveDynamicStepperBuilder() {

    this.participantNames.forEach((participantName, index) =>{

      this.participantLeaveDynamicStepperBuilder.push(
        {
          'participantName': participantName,
          'leaveDropDownGroup': this.leaveSessionGroup,
          'leaveControlName': 'participant' + (index + 1),

        }
      )
    });

  }

  /* This method is called when final submit is clicked   */
  onFinalSubmit() {
    this.participantLeaveDynamicStepperBuilder.forEach((participant) =>{
      this.createRosterRQModel.participants.push(this.prepareParticipantModel(participant))
    })
    this.manageRosterService.createNewRoster(this.createRosterRQModel).subscribe(

      (val: string | CreateRosterRSModel) => {
        this.manageRosterService.setRosterDisplaySubject(val);
      },
      (response) => {

      },
      () => {
        console.log("The POST observable is now completed.");
      }

    );
    console.log(JSON.stringify(this.createRosterRQModel));
  }

  /* Method returns participant Models */
  prepareParticipantModel(participant: {participantName: string,
                                        leaveDropDownGroup: Array<{date: string, sessions: Array<{name: string, value: string}>}>,
                                        leaveControlName: string,}): ParticipantModel {

      let particiapntModel: ParticipantModel;
      let leaveSessionDates: Array<string> = this.thirdFormGroup.controls[participant.leaveControlName].value
      particiapntModel = {
        'name': participant.participantName,
        'leaveSessions':this.prepareLeaveSessionModels(leaveSessionDates)
      }
      return particiapntModel;
  }

  /* Method returns session Models */
  prepareLeaveSessionModels(leaveSessionDates: Array<string>): Array<LeaveSessionModel> {

    let leaveSessionModels: Array<LeaveSessionModel> = new Array<LeaveSessionModel>();
    let leaveDateSessionMap: Map<string, Array<string>> = new Map<string, Array<string>>();

    if( leaveSessionDates.length != 0) {
      leaveSessionDates.forEach((leaveSessionDate) => {
        let sessionDateArray:Array<string> = leaveSessionDate.split('#');
        let session = sessionDateArray[0];
        let date = sessionDateArray[1];
        console.log(date,session)
        if(leaveDateSessionMap.has(date)) {
          leaveDateSessionMap.get(date).push(session)
        } else {
          let sessions: Array<string> = new Array<string>();
          sessions.push(session)
          leaveDateSessionMap.set(date, sessions);
        }
      });

    }

    leaveDateSessionMap.forEach((value: Array<string>, key: string) => {
      let leaveSessionModel: LeaveSessionModel = {
        'leaveDate': key,
        'sessionName': value
      }
      leaveSessionModels.push(leaveSessionModel);
    });

    return leaveSessionModels;
  }


}
