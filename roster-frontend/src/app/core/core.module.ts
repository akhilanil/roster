import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { HeaderComponent } from './header/header.component';

/* Angular Material imports */
import { MatToolbarModule} from '@angular/material';


import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RequestInterceptorService } from './services/auth/request-interceptor.service'
import { Optional, SkipSelf } from '@angular/core';

import { TokenService, AuthenticationService } from '@services/auth';
import { DateUtilsService, UrlBuilderService } from '@services/utils';


@NgModule({
  imports: [
    CommonModule,
    CoreRoutingModule,
    MatToolbarModule,
    HttpClientModule

  ],
  exports: [
    MatToolbarModule,
    HeaderComponent,
    HttpClientModule
  ],
  declarations: [HeaderComponent]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() core:CoreModule){
    if(core) {
      throw new Error("This is core module and is not suppsed to Run");
    }
  }
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: RequestInterceptorService,
          multi: true
        },
        TokenService,
        AuthenticationService,
        DateUtilsService,
        UrlBuilderService
      ]
    };
  }

}
