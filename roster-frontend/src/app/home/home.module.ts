import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/* Shared module import */
import { SharedModule } from '@app/shared/shared.module';

/* Component imports */
import { HomeRoutingModule } from './home-routing.module';
import { HomeDescComponent } from './home-desc/home-desc.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NewRosterComponent } from './new-roster/new-roster.component';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule
  ],
  declarations: [HomeDescComponent, LoginComponent, RegisterComponent, NewRosterComponent]
})
export class HomeModule { }
