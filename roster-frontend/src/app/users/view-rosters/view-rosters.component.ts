import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { mergeMap } from 'rxjs/operators';

/* Custom service imports */
import { ManageRosterService } from '@services/roster';


/* interface imports*/
import { CreateRosterRSModel } from '@interfaces/business-interface'


@Component({
  selector: 'app-view-rosters',
  templateUrl: './view-rosters.component.html',
  styleUrls: ['./view-rosters.component.css']
})
export class ViewRostersComponent implements OnInit {


  isDataLoaded: boolean;
  isError: boolean;

  constructor(
              private route: ActivatedRoute,
              private manageRosterService: ManageRosterService) {


    this.isError = false;

    this.route.params.pipe(
      mergeMap((val) => {

        return this.manageRosterService.getSpecificRoster(val['id'])
      })
    ).subscribe(
      (rosterModel: CreateRosterRSModel) => {
        this.manageRosterService.setRosterDisplaySubject(rosterModel, false);

      },
      (err => {
        console.log(err)
        this.isError = true
      })
    )


  }

  ngOnInit() {
  }

}
