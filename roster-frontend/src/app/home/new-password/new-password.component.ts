import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';

import { EMAIL_ID_LABEL, EMAIL_ID_HINT, CONTINUE_BUTTON_LABEL } from './constants/ui-constants'

import { EMAIL_ID_INVALID, EMAIL_ID_REQUIRED, USER_DOESNOT_EXIST_ERROR } from './constants/ui-constants'

import { PASSWORD_RST_INVALID_EMAIL_CLIENT } from './constants/data-constants';

/* Custom service imports */
import { AuthenticationService } from '@services/auth';
import { Router } from '@angular/router';


@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css']
})
export class NewPasswordComponent implements OnInit {

  resetPasswordFormGroup: FormGroup;

  emailIdLabel: string;

  emailHint: string;

  continueButtonLabel: string

  /* Set to true when email  send button is clicked. This disables the login button. */
  isContinueClicked: boolean;


  constructor(private formBuilder: FormBuilder,
              private authService: AuthenticationService,
              private router: Router) {

    this.resetPasswordFormGroup = this.formBuilder.group({});

    this.resetPasswordFormGroup.addControl(
      'emailIdControl', new FormControl('',
                                        [ Validators.required,
                                          Validators.maxLength(30),
                                          Validators.email
                                        ]))

    this.emailIdLabel = EMAIL_ID_LABEL;

    this.emailHint = EMAIL_ID_HINT;

    this.continueButtonLabel = CONTINUE_BUTTON_LABEL;

    this.isContinueClicked = false;

  }

  ngOnInit() {
  }

  public getEmailError() {

    return this.resetPasswordFormGroup.controls['emailIdControl'].hasError('required') ? EMAIL_ID_REQUIRED :
            this.resetPasswordFormGroup.controls['emailIdControl'].hasError('email') ? EMAIL_ID_INVALID :
              this.resetPasswordFormGroup.controls['emailIdControl'].hasError('doesnotExist') ? USER_DOESNOT_EXIST_ERROR : ''

  }

  public onSubmit() {

    if(this.resetPasswordFormGroup.valid) {
        this.isContinueClicked = true;
        this.authService.resetPasswordRequest(this.resetPasswordFormGroup.controls['emailIdControl'].value).subscribe(
          (res =>{
            this.router.navigate([''])
            this.isContinueClicked = false;
          }),
          (err => {
            if(err === PASSWORD_RST_INVALID_EMAIL_CLIENT) {
              this.resetPasswordFormGroup.controls['emailIdControl'].setErrors({'doesnotExist': true});
            }
            this.isContinueClicked = false;
          })
        )
    }

  }

}
