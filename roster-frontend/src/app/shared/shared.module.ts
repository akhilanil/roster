import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RosterInputComponent } from './roster-input/roster-input.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    RosterInputComponent
  ],
  declarations: [RosterInputComponent]
})
export class SharedModule { }
