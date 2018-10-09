import { Component, OnInit } from '@angular/core';

import { TokenService, AuthenticationService } from '@services/auth'
import { UrlBuilderService } from '@services/utils'

import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn: boolean;
  buttonText: string;

  constructor(
        private tokenService: TokenService,
        private authService: AuthenticationService,
        private router: Router,
        private iconRegistry: MatIconRegistry,
        private sanitizer: DomSanitizer,
        private urlService: UrlBuilderService) {

            iconRegistry.addSvgIcon(
            'github',
            sanitizer.bypassSecurityTrustResourceUrl('assets/img/header/github-circle.svg')
          );

         }

  ngOnInit() {

    this.tokenService.authSubjectObservable.subscribe(val => {
      this.isLoggedIn = val
      this.buttonText = (this.isLoggedIn)? "LOGOUT" : "CONTACT US"
    })

  }

  onButtonClicked() {
    if(this.isLoggedIn) {
      this.authService.userLogout();
      this.router.navigate(['/roster']);
    }
  }

  onGitHubClicked() {
    let gitHubLink = this.urlService.buildGitHubLinkUrl();
    window.open(gitHubLink, '_blank')
  }

}
