import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRostersComponent } from './user-rosters/user-rosters.component';



/* Shared module import */
import { SharedModule } from '@app/shared/shared.module';

/* Routing module import */
import { UsersRoutingModule } from './users-routing.module';
import { ViewRostersComponent } from './view-rosters/view-rosters.component';
import { NewRostersComponent } from './new-rosters/new-rosters.component';
import { SimpleDialogComponent } from '@app/shared/simple-dialog/simple-dialog.component';





@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    UsersRoutingModule
  ],
  declarations: [UserRostersComponent, ViewRostersComponent, NewRostersComponent],
  entryComponents: [UserRostersComponent, SimpleDialogComponent],
})
export class UsersModule { }
