import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* Feature module imports */
import { HomeDescComponent } from './home-desc/home-desc.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NewRosterComponent } from './new-roster/new-roster.component'
import { ViewRosterComponent } from './view-roster/view-roster.component'
import { ResetPasswordComponent } from './reset-password/reset-password.component'
import { NewPasswordComponent } from './new-password/new-password.component'

/* Custom service inputs */
import { ViewRosterRouteGaurdService } from '@services/routes/gaurds'

const routes: Routes = [
  {
    path:'home',
    component: HomeDescComponent,
    children: [
      {
        path:'login',
        component: ResetPasswordComponent,
      },
      {
        path:'register',
        component: RegisterComponent,
      },
      {
        path: 'reset-password',
        component: ResetPasswordComponent,
      },
      {
        path: 'reset-password/:id',
        component: NewPasswordComponent,
      },
      {
        path:'',
        redirectTo: 'login'
      }
    ]
  },
  {
    path:'create-roster',
    component: NewRosterComponent,
  },
  {
    path:'new-roster',
    component: ViewRosterComponent,
    canActivate: [ViewRosterRouteGaurdService]
  },
  { path:'', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
