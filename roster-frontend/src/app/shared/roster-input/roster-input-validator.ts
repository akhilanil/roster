import { ValidatorFn, AbstractControl, FormGroup, FormControl } from "@angular/forms";

import { RosterListCacheService } from '@services/cache-manager'
import { ReplaySubject } from "rxjs";
import { CreateRosterRSModel } from "@interfaces/business-interface";

export class RosterInputValidator {




  constructor() {}


  /** Validator for duplicate roster */
  public static validateForDupRoster( rosterList: Array<CreateRosterRSModel>, formGroup: FormGroup): ValidatorFn {
    return (control: AbstractControl)  => {

      if(formGroup == null) {
        return null;
      }


      let titleControl = formGroup.get('tc');
      let yearControl = formGroup.get('yc');
      let monthControl = formGroup.get('mc');


      console.log(titleControl, yearControl, monthControl, control.value)


      if(titleControl == null || yearControl == null || monthControl == null) {
        return null;
      }

      control.value

      if(control.pristine ||
        rosterList == null ||
        rosterList.length === 0 ||
        titleControl.pristine ||
        yearControl.pristine ||
        monthControl.pristine) {
        return null;
      }

      let title: string = titleControl.value;
      let year: string = yearControl.value;
      let month: string = monthControl.value;

      rosterList.forEach((roster: CreateRosterRSModel) => {

        let rosterMonth: string;
        let rosterYear: string;
        let rosterTitle: string

        if(typeof roster.month === "number") {
          rosterMonth = '' + roster.month
        }
        if(typeof roster.year === "number") {
          rosterYear = '' + roster.month
        }

        let isDuplicate: boolean = false;
        console.log(title, year, month);
        console.log(rosterList)

        if(title.trim().toUpperCase ===  rosterTitle.trim().toUpperCase &&
           year.trim().toUpperCase === rosterYear.trim().toUpperCase   &&
           month.trim().toUpperCase === rosterMonth.trim().toUpperCase
         ) {
          return  {'duproster': true};
        }
      });

      return  null;
    }
  }

  /*Validates for same name */
  public static checkForDuplicates(formGroup: FormGroup, checkFor: string ): ValidatorFn {

    let values: Array<string> = new Array<string>();

      return (control: AbstractControl)  => {

        if(control.pristine) {
          return null;
        }
        values = [];
        Object.keys(formGroup.controls).forEach(key => {
          let val:string = formGroup.get(key).value
          if(formGroup.controls[key] != control && val.length != 0 && key.startsWith(checkFor)) {
            values.push(val.toUpperCase());
          }
        })
        return values.includes(control.value.toUpperCase())?  {'duplicates': true} : null;
      }
  }

  /*
   * Validates for conflict in participant and session
   */
  public static checkForNameConflicts(formGroup: FormGroup ): ValidatorFn {

    let controlMap : Map<String, String> = new Map<String, String>();
    let currentGroup: string;

    return (control: AbstractControl)  => {

      if(control.pristine) {
        return null;
      }
      controlMap.clear();
      Object.keys(formGroup.controls).forEach(key => {
        let val:string = formGroup.get(key).value.toUpperCase();
        if(val.trim().length != 0) {
          if(formGroup.controls[key] == control) {
            if(key.startsWith('session')) {
              currentGroup = 'session'
            } else if(key.startsWith('participant')) {
              currentGroup = 'participant'
            }
          } else {
              controlMap.set(key, val);
          }

        }

      })
      let isNotValid: boolean = false;
      controlMap.forEach((value, key) => {

        if(!key.startsWith(currentGroup) && value == control.value.toUpperCase() ) {
          isNotValid = true;
        }
      })
      if(isNotValid) {
          return {'conflict': true}
      }

      return null;
    }
  }






}
