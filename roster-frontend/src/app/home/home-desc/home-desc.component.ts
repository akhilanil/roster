import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

/* UI constants  */
import { LOGIN_BUTTON } from './constants/ui-constants'
import { REGISTER_BUTTON } from './constants/ui-constants'
import { CONTINUE_BUTTON } from './constants/ui-constants'
import { HOME_DESC_HEADING } from './constants/ui-constants'
import { HOME_DESC_TEXT } from './constants/ui-constants'

/* Routing URL constants */
import { LOGIN_URL } from './constants/url-constants'
import { REGISTER_URL } from './constants/url-constants'




@Component({
  selector: 'app-home-desc',
  templateUrl: './home-desc.component.html',
  styleUrls: ['./home-desc.component.css']
})
export class HomeDescComponent implements OnInit {



  /* Variable to indicate the state of home view. Either Login or Register */
  isLogin : boolean;

  /* String representing Login/Signup button name */
  buttonName : string;

  /* String representing header for home component */
  homeDescHeader : string;

  /* String representing header for home component */
  homeDescText : string;

  /* String representing Login/Signup button name */
  continueButton : string;

  /* Holds the breakpoint constant of the screen. If the screen width is
     less than 400 then components are aligned vertically making the screen
      responsive
   */
  breakpoint : number;


  isGutterRequired : boolean;


  constructor(private router: Router) {

    /* Checks the current url and set appropriate value for the route */
    if(this.router.url === LOGIN_URL){
      this.isLogin = true
      this.buttonName = REGISTER_BUTTON
    } else if(this.router.url === REGISTER_URL){
      this.isLogin = false
      this.buttonName = LOGIN_BUTTON
    }

    this.homeDescHeader = HOME_DESC_HEADING
    this.homeDescText = HOME_DESC_TEXT
    this.continueButton = CONTINUE_BUTTON
  }

  ngOnInit() {
    this.breakpoint = (window.innerWidth <= 400) ? 1 : 2;
    this.isGutterRequired = (window.innerWidth <= 400) ? false : true;
  }

  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 400) ? 1 : 2;
    this.isGutterRequired = (window.innerWidth <= 400) ? false : true;
  }

  /*
    This method handles the routing between login and register when
    Login/Signup button is clicked
  */
  onStateChanged() {

    this.isLogin = !this.isLogin
    if(this.isLogin) {
      this.buttonName = REGISTER_BUTTON
      this.router.navigate([LOGIN_URL])

    } else {
      this.buttonName = LOGIN_BUTTON
      this.router.navigate([REGISTER_URL])
    }
     
  }

}
