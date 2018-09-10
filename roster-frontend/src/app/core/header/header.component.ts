import { Component, OnInit } from '@angular/core';

import { TokenService, AuthenticationService } from '@services/auth'
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn: boolean;
  buttonText: string;

  constructor(private tokenService: TokenService, private authService: AuthenticationService, private router: Router) { }

  ngOnInit() {

    this.tokenService.authSubjectObservable.subscribe(val => {
      this.isLoggedIn = val
      this.buttonText = (this.isLoggedIn)? "LOGOUT" : "CONTACT US"
    })

  }

  onButtonClicked() {
    if(this.isLoggedIn) {
      this.authService.userLogout().subscribe(
        (val) => {
          this.router.navigate(['/']);
        }
      );
    }
  }

}
