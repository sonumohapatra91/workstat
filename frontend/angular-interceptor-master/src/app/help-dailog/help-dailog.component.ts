import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface DialogData {  
  name: string;
}

@Component({
  selector: 'app-help-dailog',
  templateUrl: './help-dailog.component.html',
  styleUrls: ['./help-dailog.component.css']
})
export class HelpDailogComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<HelpDailogComponent> ,
    @Inject(MAT_DIALOG_DATA) public data: DialogData  
  ) { }

  ngOnInit() {
  }
  onClose(): void {
    this.dialogRef.close();
  }

}
