import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

import { EMAIL_ID_LABEL } from './constants/ui-constants';
import { PASSWORD_LABEL } from './constants/ui-constants'
import { CONFIRM_PASSWORD_LABEL } from './constants/ui-constants'
import { REGISTER_BUTTON } from './constants/ui-constants'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  options: FormGroup;

  /* Label  for username  */
  emailIdInputLabel : string;

  /* Label  for password  */
  passwordInputLabel : string;

  /* Label  for password  */
  confirmPasswordInputLabel : string;

  /* String representing Login/Signup button name */
  registerButton : string;



  constructor(fb: FormBuilder) {

    this.options = fb.group({
      hideRequired: false,
      floatLabel: 'auto',
    });

    this.emailIdInputLabel = EMAIL_ID_LABEL;
    this.passwordInputLabel = PASSWORD_LABEL;
    this.confirmPasswordInputLabel = CONFIRM_PASSWORD_LABEL;
    this.registerButton = REGISTER_BUTTON;

  }

  ngOnInit() {
  }

}
