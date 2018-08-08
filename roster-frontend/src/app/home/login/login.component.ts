import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';


import { USER_NAME_LABEL } from './constants/ui-constants';
import { PASSWORD_LABEL } from './constants/ui-constants'
import { LOGIN_BUTTON } from './constants/ui-constants'


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




  constructor(fb: FormBuilder) {

    this.options = fb.group({
      hideRequired: false,
      floatLabel: 'auto',
    });

    this.usernameInputLabel = USER_NAME_LABEL;
    this.passwordInputLabel = PASSWORD_LABEL;
    this.loginButton = LOGIN_BUTTON;

  }



  ngOnInit() {
  }

}
