import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { User, Role } from '../model';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentUser: User;

  constructor(public loginService: AuthenticationService, public dialog: MatDialog) { }
  ngOnInit() {
  }

  openLoginDialog() {
    const dialogConfig = new MatDialogConfig();
    
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;

    //const dialogRef = this.dialog.open(AnimatedloginComponent, dialogConfig);
  }

}
