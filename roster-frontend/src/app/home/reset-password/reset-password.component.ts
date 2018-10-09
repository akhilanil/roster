import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '@services/auth';

import { ResetPasswordValidator } from './reset-password-validator'
import { NEW_PASSOWRD_LABEL, CONFIRM_PASSOWRD_LABEL, PASSWORD_HINT,
         CONTINUE_BUTTON_LABEL, FIELD_REQUIRED, INVALID_PASSWORD,
         PASSWORD_DOESNOT_MATCH } from './constants/ui-constants'



@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {


  resetPasswordFormGroup: FormGroup;

  newPasswordLabel: string;

  confirmPasswordLabel: string;

  passwordHint: string;

  changePasswordButtonLabel: string

  passwordHide: boolean;

  passwordToken: string;



  constructor(private formBuilder: FormBuilder,
              private authService: AuthenticationService,
              private route: ActivatedRoute,
              private router: Router) {

    this.resetPasswordFormGroup = this.formBuilder.group({});

    this.resetPasswordFormGroup.addControl(
      'newPasswordControl', new FormControl('',
                                        [ Validators.required,
                                          Validators.maxLength(14),
                                          Validators.minLength(8)
                                        ]))
    this.resetPasswordFormGroup.addControl(
      'confirmPasswordControl', new FormControl('',
                                      [ Validators.required,
                                        ResetPasswordValidator.isSamePasword(this.resetPasswordFormGroup)
                                      ]))

    this.newPasswordLabel = NEW_PASSOWRD_LABEL;

    this.confirmPasswordLabel = CONFIRM_PASSOWRD_LABEL;

    this.passwordHint = PASSWORD_HINT;

    this.changePasswordButtonLabel = CONTINUE_BUTTON_LABEL;

    this.passwordHide = true;

    this.route.params.subscribe((val) => {
      this.passwordToken = val['id'];
    })



  }

  ngOnInit() {
  }

  public getNewPasswordError() {

    return this.resetPasswordFormGroup.controls['newPasswordControl'].hasError('required') ? FIELD_REQUIRED :
            this.resetPasswordFormGroup.controls['newPasswordControl'].hasError('maxlength') ? INVALID_PASSWORD :
              this.resetPasswordFormGroup.controls['newPasswordControl'].hasError('minlength') ? INVALID_PASSWORD : ''

  }

  public getConfirmPasswordError() {

    return this.resetPasswordFormGroup.controls['confirmPasswordControl'].hasError('required') ? FIELD_REQUIRED :
              this.resetPasswordFormGroup.controls['confirmPasswordControl'].hasError('isNotSame') ? PASSWORD_DOESNOT_MATCH : ''

  }

  public onSubmit() {

    if(this.resetPasswordFormGroup.valid) {
        this.authService.confirmResetPassword(this.passwordToken, this.resetPasswordFormGroup.controls['newPasswordControl'].value).subscribe(
          (res =>{
            this.router.navigate([''])

          }),
          (err => {
          
          })
        )
    }
  }
}
