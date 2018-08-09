import { Component, OnInit } from '@angular/core';

import {FormBuilder, FormGroup} from '@angular/forms';
import {FormControl, Validators} from '@angular/forms';

/* UI constants import */
import { USER_NAME_LABEL } from './constants/ui-constants';
import { PASSWORD_LABEL } from './constants/ui-constants'
import { LOGIN_BUTTON } from './constants/ui-constants'

/* Validation constants */
import { REQUIRED_EMAIL_FIELD_MSG } from './constants/ui-constants'
import { VALID_EMAIL_FIELD_MSG } from './constants/ui-constants'
import { REQUIRED_PSWRD_FIELD_MSG } from './constants/ui-constants'
import { INVALID_EMAIL_PSWRD_MSG } from './constants/ui-constants'



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  options: FormGroup;

  /* Label  for username  */
  usernameInputLabel : string;

  /* Label  for password  */
  passwordInputLabel : string;

  /* String representing Login/Signup button name */
  loginButton : string;

  /* Form control for email field  */
  emailControl: FormControl;

  /* Form control for password field  */
  passwordControl: FormControl;

  /* Two way data binding for  emailID */
  userEmailId: string;

  /* Two way data binding for password */
  userPassword: string;





  constructor(fb: FormBuilder) {

    this.options = fb.group({
      hideRequired: false,
      floatLabel: 'auto'

    });

    this.usernameInputLabel = USER_NAME_LABEL;
    this.passwordInputLabel = PASSWORD_LABEL;
    this.loginButton = LOGIN_BUTTON;
    this.emailControl  = new FormControl('', [Validators.required, Validators.email]);
    this.passwordControl = new FormControl('', [Validators.required]);

  }


  getEmailErrorMessage() {
    return this.emailControl.hasError('required') ? REQUIRED_EMAIL_FIELD_MSG :
        this.emailControl.hasError('email') ? VALID_EMAIL_FIELD_MSG :
            '';
  }

  getPswrdErrorMessage() {
    return this.passwordControl.hasError('required') ? REQUIRED_PSWRD_FIELD_MSG :  '';
  }

  getAuthErrorMessage() {
    // return this.email.hasError('required') ? REQUIRED_EMAIL_FIELD_MSG :
    //     this.email.hasError('email') ? VALID_EMAIL_FIELD_MSG :
    //         '';
  }

  onSubmit() {
    console.log(this.emailControl.value)
    console.log(this.passwordControl.value)
    console.log(this.emailControl.valid)
    console.log(this.passwordControl.valid)
  }



  ngOnInit() {
  }

}
