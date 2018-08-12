import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/* Component imports */
import { HomeRoutingModule } from './home-routing.module';
import { HomeDescComponent } from './home-desc/home-desc.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

/* Material Module imports  */
import { MaterialModule } from '../material.module';

import { SharedModule } from '@app/shared/shared.module';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NewRosterComponent } from './new-roster/new-roster.component';




@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [HomeDescComponent, LoginComponent, RegisterComponent, NewRosterComponent]
})
export class HomeModule { }
