import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* Feature module imports */
import { HomeDescComponent } from './home-desc/home-desc.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NewRosterComponent } from './new-roster/new-roster.component'

const routes: Routes = [
  {
    path:'home',
    component: HomeDescComponent,
    children: [
      {
        path:'login',
        component: LoginComponent,
      },
      {
        path:'register',
        component: RegisterComponent,
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
  { path:'', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
