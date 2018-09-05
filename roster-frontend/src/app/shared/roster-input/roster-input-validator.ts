import { ValidatorFn, AbstractControl } from "@angular/forms";

export class RosterInputValidator {

  constructor() {

  }

  /*Returns a list having duplicate values  */
  static checkForDuplictaes(values: Array<string> ): ValidatorFn {

      return (control: AbstractControl)  => {

        return values.includes(control.value)?  null :  {'isNotDuplicate': true}

      }


  }

}
