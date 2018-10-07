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


/* Interface imports */
import { Users } from '@interfaces/users-interface'

/* Service imports  */
import { AuthenticationService } from '@services/auth'
import { TokenService } from '@services/auth'
import { Router } from '@angular/router';


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

  /* User interface  */
  userModel: Users;

  /* Set to true if wrong Credentials are entered */
  isWrongCredentials: boolean;

  /* Set to true  if the login button clicked atleast once*/
  hasTriedToLogin: boolean;


  constructor(fb: FormBuilder,
              private authService: AuthenticationService,
              private tokenService: TokenService,
            private router: Router) {

    this.options = fb.group({
      hideRequired: false,
      floatLabel: 'auto'

    });

    this.usernameInputLabel = USER_NAME_LABEL;
    this.passwordInputLabel = PASSWORD_LABEL;
    this.loginButton = LOGIN_BUTTON;
    this.emailControl  = new FormControl('', [Validators.required, Validators.email]);
    this.passwordControl = new FormControl('', [Validators.required]);
    this.isWrongCredentials = false;
    this.userModel = {} as Users;
    this.hasTriedToLogin = false;

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
    return this.isWrongCredentials ? INVALID_EMAIL_PSWRD_MSG : "";

  }

  onSubmit() {


    this.hasTriedToLogin = true;
    this.userModel.username = this.emailControl.value;
    this.userModel.password = this.passwordControl.value;


    this.authService.userLogin(this.userModel).subscribe(
        (val) => {
            this.tokenService.saveToken(val['token']);
            this.isWrongCredentials = false;
            this.router.navigate([''])
        },
        response => {
            this.isWrongCredentials = true;
        },
        () => {
            console.log("User Logged in");
        });

  }



  ngOnInit() {
  }

}
