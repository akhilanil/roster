import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RosterInputComponent } from './roster-input/roster-input.component';

/* Material Module imports  */
import { MaterialModule } from '../material.module';

/* Angular Forms import */
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { DisplayRosterComponent, RosterSheetComponent } from './display-roster/display-roster.component';


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

  ],
  entryComponents: [RosterSheetComponent],
  declarations: [RosterInputComponent, DisplayRosterComponent, DisplayRosterComponent, RosterSheetComponent]
})
export class SharedModule { }
