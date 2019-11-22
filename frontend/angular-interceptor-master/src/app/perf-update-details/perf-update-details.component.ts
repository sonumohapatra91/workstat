import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker/public_api';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpClientService } from '../service/httpclient.service';
import { ToastrService } from 'ngx-toastr';
import { formatDate } from '@angular/common';

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
  users: string;
  bugid: string;
  scenarios: string;
}

@Component({
  selector: 'app-perf-update-details',
  templateUrl: './perf-update-details.component.html',
  styleUrls: ['./perf-update-details.component.css']
})
export class PerfUpdateDetailsComponent implements OnInit {

  today= new Date();
  jstoday = '';
  updateForm: FormGroup;
  submitted = false;
  perfemployee: any;
  colorTheme = '';
  bsConfig: Partial<BsDatepickerConfig>;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<PerfUpdateDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserData,
    private httpClientService: HttpClientService,
    private toastrService: ToastrService) {
    this.perfemployee = { ...data };
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

  updatePerfDetails(): void {
    this.submitted = true;
    this.jstoday = formatDate(this.today, 'yyyy-MM-dd HH:mm:ss', 'en-US', '+0530');
    this.perfemployee.today = this.jstoday;
    this.httpClientService.updatePerfDetails(this.perfemployee)
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