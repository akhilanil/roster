import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/* Component imports */
import { HomeRoutingModule } from './home-routing.module';
import { HomeDescComponent } from './home-desc/home-desc.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

/* Material Module imports  */
import { MaterialModule } from '../material.module';


@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule
  ],
  declarations: [HomeDescComponent, LoginComponent, RegisterComponent]
})
export class HomeModule { }
