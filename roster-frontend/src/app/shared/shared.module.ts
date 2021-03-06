import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RosterInputComponent } from './roster-input/roster-input.component';

/* Material Module imports  */
import { MaterialModule } from '../material.module';

/* Angular Forms import */
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { DisplayRosterComponent, RosterSheetComponent } from './display-roster/display-roster.component';
import { SimpleDialogComponent } from './simple-dialog/simple-dialog.component';

import { PageNotFoundComponent } from './error/page-not-found/page-not-found.component';


@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,

  ],
  exports: [
    RosterInputComponent,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    DisplayRosterComponent,
    SimpleDialogComponent,
    PageNotFoundComponent,

  ],
  entryComponents: [RosterSheetComponent],
  declarations: [RosterInputComponent, DisplayRosterComponent, DisplayRosterComponent, RosterSheetComponent, SimpleDialogComponent, PageNotFoundComponent]
})
export class SharedModule { }
