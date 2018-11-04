import { Component, OnInit } from '@angular/core';

import { TokenService, AuthenticationService } from '@services/auth'
import { UrlBuilderService } from '@services/utils'
import { RosterListCacheService } from '@services/cache-manager'

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
        private urlService: UrlBuilderService,
        private rosterListCacheService: RosterListCacheService,) {

            iconRegistry.addSvgIcon(
            'github',
            sanitizer.bypassSecurityTrustResourceUrl(this.urlService.buildGetGitHubImageUrl())
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
      /* destroys the cache of current user */
      this.rosterListCacheService.resetCache();
      this.router.navigate(['/roster']);
    } else {
      window.location.href = "mailto:akhilanil95@gmail.com"
    }
  }

  onGitHubClicked() {
    let gitHubLink = this.urlService.buildGitHubLinkUrl();
    window.open(gitHubLink, '_blank')
  }

}
