import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import {HomeModule} from './home/home.module'

const routes: Routes = [
  {
    path: 'roster', loadChildren: './home/home.module#HomeModule'
  },
  {
    path: '',
    loadChildren: './users/users.module#UsersModule',
  },

]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
