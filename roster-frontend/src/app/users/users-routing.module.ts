import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* Component import */
import { UserRostersComponent } from '@app/users/user-rosters/user-rosters.component';
import { ViewRostersComponent } from '@app/users/view-rosters/view-rosters.component';
import { NewRostersComponent } from '@app/users/new-rosters/new-rosters.component';
import { LoginRouteService } from '@app/core/services/routes/gaurds';

const routes: Routes = [
  {
    path:'my-rosters',
    component: UserRostersComponent,
    canActivate: [LoginRouteService]
  },
  {
    path: 'new-roster',
    component: NewRostersComponent,
    canActivate: [LoginRouteService]
  },
  {
    path: 'view-roster/:id',
    component: ViewRostersComponent
  },
  { path:'', redirectTo: 'my-rosters', pathMatch: 'full' },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule { }
