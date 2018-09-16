import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginRouteService } from '@app/core/services/routes/gaurds';
// import {HomeModule} from './home/home.module'

const routes: Routes = [
  {
    path: 'roster', loadChildren: './home/home.module#HomeModule'
  },
  {
    path: '',
    loadChildren: './users/users.module#UsersModule',
    canActivate: [LoginRouteService]
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
