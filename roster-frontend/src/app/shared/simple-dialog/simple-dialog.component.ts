import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

/* Action constant import */
import { LOGOUT_ACTION } from './constants/action-constants'

/* Custome service import */
import {AuthenticationService} from '@services/auth'
import { Router } from '@angular/router';


@Component({
  selector: 'app-simple-dialog',
  templateUrl: './simple-dialog.component.html',
  styleUrls: ['./simple-dialog.component.css']
})
export class SimpleDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<SimpleDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: {title: string, description: string, actions:string},
              private authService: AuthenticationService,
              private router: Router
            ) { }

  ngOnInit() {
  }

  onButtonClicked(): void {
    this.performAction();
    this.dialogRef.close();

  }


  private performAction(): void {

    const action: string  = this.data.actions;

    switch(action){
      case LOGOUT_ACTION:
        this.authService.userLogout();
        this.router.navigate(['']);

    }

  }

}
