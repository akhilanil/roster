import { ValidatorFn, AbstractControl, FormGroup } from "@angular/forms";

export class ResetPasswordValidator {


  constructor() {

  }

  public static isSamePasword(formGroup: FormGroup): ValidatorFn {

    return (control : AbstractControl) => {
      if(control.pristine) {
        return null
      }
      let values: Array<string> = new Array<string>();
      let initial_password: string = formGroup.controls['newPasswordControl'].value.trim()
      return (initial_password != control.value) ? {'isNotSame': true} : null;
    }
  }
}
