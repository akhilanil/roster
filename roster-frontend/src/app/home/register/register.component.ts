import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';


import { EMAIL_ID_LABEL, FIRST_NAME_LABEL, LAST_NAME_LABEL, EMAIL_ID_REQUIRED,
  EMAIL_ID_INVALID, FIELD_HINTS, FIRST_NAME_INVALID, FIRST_NAME_REQUIRED,
  LAST_NAME_INVALID, LAST_NAME_REQUIRED, PASSWORD_REQUIRED, PASSWORD_INVALID,
  CONFIRM_PASSWORD_ERROR, PATTERN_CHARACTERS_INVALID, USER_ALREADY_EXIST_ERROR } from './constants/ui-constants';

import { PASSWORD_LABEL } from './constants/ui-constants'
import { CONFIRM_PASSWORD_LABEL } from './constants/ui-constants'
import { REGISTER_BUTTON } from './constants/ui-constants'
import { Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';

import { RegisterInputValidator } from './register-validator'

import { Users } from '@interfaces/users-interface'
import { AuthenticationService } from '@services/auth';

import { USER_ALREADY_EXIST } from './constants/data-constants'
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  registerFormGroup: FormGroup;



  /* Label  for username  */
  emailIdInputLabel : string;

  /* Label  for username  */
  firstNameLabel : string;

  /* Label  for username  */
  lastNameLabel : string;



  /* Label  for password  */
  passwordInputLabel : string;

  /* Label  for password  */
  confirmPasswordInputLabel : string;

  /* String representing Login/Signup button name */
  registerButton : string;

  /* Hints used for first name, last name and password */
  fieldHints: string;

  /* User already exist error label */
  userAlreadyExist: boolean;



  constructor(  private fb: FormBuilder,
                private authService: AuthenticationService,
                private router: Router) {

    this.registerFormGroup = fb.group({
      hideRequired: false,
      floatLabel: 'auto',
    });

    this.registerFormGroup.addControl(
      'emailIdControl', new FormControl('',
                                        [ Validators.required,
                                          Validators.maxLength(30),
                                          Validators.email
                                        ]),
    )

    this.registerFormGroup.addControl(
      'firstNameControl', new FormControl('',
                                        [ Validators.required,
                                          Validators.maxLength(14),
                                          Validators.minLength(3),
                                          Validators.pattern('^[a-zA-Z][a-zA-Z ]*[a-zA-Z]$'),
                                        ]),
    )

    this.registerFormGroup.addControl(
      'lastNameControl', new FormControl('',
                                        [ Validators.required,
                                          Validators.maxLength(14),
                                          Validators.minLength(3),
                                          Validators.pattern('^[a-zA-Z][a-zA-Z ]*[a-zA-Z]$'),
                                        ]),
    )

    this.registerFormGroup.addControl(
      'passwordControl', new FormControl('',
                                        [ Validators.required,
                                          Validators.maxLength(14),
                                          Validators.minLength(8),
                                        ]),
    )


    this.registerFormGroup.addControl(
      'confirmPasswordControl', new FormControl('',
                                        [ Validators.required,
                                          RegisterInputValidator.isSamePasword(this.registerFormGroup)
                                        ]),
    )



    this.emailIdInputLabel = EMAIL_ID_LABEL
    this.passwordInputLabel = PASSWORD_LABEL;
    this.firstNameLabel = FIRST_NAME_LABEL;
    this.lastNameLabel = LAST_NAME_LABEL;
    this.confirmPasswordInputLabel = CONFIRM_PASSWORD_LABEL;
    this.registerButton = REGISTER_BUTTON;
    this.fieldHints = FIELD_HINTS;
    this.userAlreadyExist = false;


  }

  /*
   * Method to get email error
   */
  public getEmailError(): string {
    return this.registerFormGroup.controls['emailIdControl'].hasError('required') ?   EMAIL_ID_REQUIRED :
            this.registerFormGroup.controls['emailIdControl'].hasError('email') ? EMAIL_ID_INVALID :
            this.registerFormGroup.controls['emailIdControl'].hasError('duplicateUser') ? USER_ALREADY_EXIST_ERROR : ''

  }

  /*
   * Method to get First name error
   */
  public getFirstNameError(): string {
    return this.registerFormGroup.controls['firstNameControl'].hasError('required') ?   FIRST_NAME_REQUIRED :
            this.registerFormGroup.controls['firstNameControl'].hasError('minlength') ? FIRST_NAME_INVALID :
              this.registerFormGroup.controls['firstNameControl'].hasError('maxlength') ? FIRST_NAME_INVALID :
                this.registerFormGroup.controls['firstNameControl'].hasError('pattern') ? PATTERN_CHARACTERS_INVALID : ''
  }

  /*
   * Method to get last name error
   */
  public getLastNameError(): string {
    return this.registerFormGroup.controls['lastNameControl'].hasError('required') ?    LAST_NAME_REQUIRED:
            this.registerFormGroup.controls['lastNameControl'].hasError('minlength') ?    LAST_NAME_INVALID:
              this.registerFormGroup.controls['lastNameControl'].hasError('maxlength') ? LAST_NAME_INVALID:
                this.registerFormGroup.controls['lastNameControl'].hasError('pattern') ? PATTERN_CHARACTERS_INVALID : ''

  }

  /*
   * Method to get password error
   */
  public getPasswordError(): string {
    return this.registerFormGroup.controls['passwordControl'].hasError('required') ?    PASSWORD_REQUIRED:
            this.registerFormGroup.controls['passwordControl'].hasError('minlength') ?    PASSWORD_INVALID:
              this.registerFormGroup.controls['passwordControl'].hasError('maxlength') ? PASSWORD_INVALID : ''
  }

  /*
   * Method to get confirm password error
   */
  public getConfirmPasswordError(): string {
    return this.registerFormGroup.controls['confirmPasswordControl'].hasError('required') ?    CONFIRM_PASSWORD_ERROR:
            this.registerFormGroup.controls['confirmPasswordControl'].hasError('isNotSame') ?    CONFIRM_PASSWORD_ERROR: '';
  }



  ngOnInit() {

  }

  public onRegister(){

    if(this.registerFormGroup.valid){
      let newUser: Users = this.buildUserModel()
      this.authService.registerNewUser(newUser).subscribe(
        (res) => {
          this.authService.userLogin(newUser).subscribe(
            (res) => {

            },
            (err) => {

            },
            () => {
              this.router.navigate([''])
            }
          )},
        (err) => {

          if(err === USER_ALREADY_EXIST) {
            this.registerFormGroup.controls['emailIdControl'].setErrors({'duplicateUser': true});
            this.userAlreadyExist = true;
          }
        },
        () => {

        }
      )
    }

  }


  private buildUserModel(): Users {

    return  {
      username: this.registerFormGroup.controls['emailIdControl'].value.trim(),
      password: this.registerFormGroup.controls['passwordControl'].value.trim(),
      firstName: this.registerFormGroup.controls['firstNameControl'].value.trim().toUpperCase(),
      lastName: this.registerFormGroup.controls['lastNameControl'].value.trim().toUpperCase()

    }

  }


}
