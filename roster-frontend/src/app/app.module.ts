import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

/* Main App routing import */
import { AppRoutingModule } from './app-routing.module';

// /*Core module import*/
// import { CoreModule } from './core/core.module'

/*Core module import*/
import { CoreModule } from '@app/core/core.module'

/* Form Builder import */
import {FormBuilder} from '@angular/forms';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule.forRoot(),
    AppRoutingModule,
    SharedModule


  ],
  providers: [FormBuilder,],
  bootstrap: [AppComponent]
})
export class AppModule { }
