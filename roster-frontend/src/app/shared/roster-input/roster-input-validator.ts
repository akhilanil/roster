import { ValidatorFn, AbstractControl, FormGroup } from "@angular/forms";

export class RosterInputValidator {


  constructor() {

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
            values.push(val);
          }
        })
        return values.includes(control.value)?  {'duplicates': true} : null;
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
        let val:string = formGroup.get(key).value;
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
        
        if(!key.startsWith(currentGroup) && value == control.value ) {
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
