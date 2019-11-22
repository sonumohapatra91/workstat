import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClientService, Employee } from '../service/httpclient.service';
import { ToastrService } from 'ngx-toastr';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { MatDialog, MatDialogRef } from '@angular/material';
import { MAT_DIALOG_DATA } from "@angular/material";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {formatDate } from '@angular/common';

export interface UserData {

  empid: string;
  project: string;
  manager: string;
  customer: string;
  tstatus: string;
  tools: string;
  env: string;
  psdate: string;
  pedate: string;
  asdate: string;
  aedate: string;
  cstatus: string;
  resources: string;
  remark: string;
  today: string;
}


@Component({
  selector: 'app-update-details',
  templateUrl: './update-details.component.html',
  styleUrls: ['./update-details.component.css']
})
export class UpdateDetailsComponent implements OnInit {

  today= new Date();
  jstoday = '';
  updateForm: FormGroup;
  submitted = false;
  employee: any;
  colorTheme = '';
  bsConfig: Partial<BsDatepickerConfig>;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<UpdateDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserData,
    private httpClientService: HttpClientService,
    private toastrService: ToastrService) {
    this.employee = { ...data };
    this.bsConfig = Object.assign({},
      {
        containerClass: 'theme-dark-blue',
        dateInputFormat: 'YYYY-MM-DD',
        showWeekNumbers: false,
        adaptivePosition: true
      });
  }

  ngOnInit() {
    this.updateForm = this.formBuilder.group({
      project: ['', Validators.required]
    });
  }
  // convenience getter for easy access to form fields
  get f() { return this.updateForm.controls; }

  updateDetails(): void {
    this.submitted = true;    
    this.jstoday = formatDate(this.today, 'yyyy-MM-dd HH:mm:ss', 'en-US', '+0530');
    this.employee.today = this.jstoday;
    this.httpClientService.updateDetails(this.employee)
      .subscribe(data => {
        this.toastrService.success('Project updated successfully', 'Action')
        this.dialogRef.close()
        window.location.reload()
      },
        err => this.toastrService.error('Form has errors', 'Error')
      );

  };
  closeDialog() {
    this.dialogRef.close({ event: 'Cancel' });
  }

}
