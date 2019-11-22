import { Component, OnInit } from '@angular/core';
import xlsxParser from 'xlsx-parse-json';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker/public_api';
import { Performance, HttpClientService } from '../service/httpclient.service';
import { Router } from '@angular/router';
import { DatePipe, formatDate } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../service/authentication.service';
import { MatDialog, PageEvent } from '@angular/material';
import { HelpDailogComponent } from '../help-dailog/help-dailog.component';
import { concat } from 'rxjs';
import { isDate } from 'ngx-bootstrap/chronos/utils/type-checks';
import { AlertDailogModel, AlertDailogComponent } from '../alert-dailog/alert-dailog.component';
import { ConstantPool } from '@angular/compiler';

@Component({
  selector: 'app-perf-add-details',
  templateUrl: './perf-add-details.component.html',
  styleUrls: ['./perf-add-details.component.css']
})
export class PerfAddDetailsComponent implements OnInit {

  today = new Date();
  jstoday = '';
  name: string;
  perfemployees: any;
  addForm: FormGroup;
  submitted = false;
  colorTheme = '';
  bsConfig: Partial<BsDatepickerConfig>;
  perfemployee: Performance = new Performance("", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "");
  perfemployeeimport: Performance = new Performance("", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "");
  row_ps: string = ' ';
  row_pe: string = ' ';
  row_as: string = ' ';
  row_ae: string = ' ';

  constructor(
    private router: Router,
    private httpClientService: HttpClientService,
    public loginService: AuthenticationService,
    public alertdialog: MatDialog,
    public helpdialog: MatDialog,
    private formBuilder: FormBuilder,
    public datepipe: DatePipe,
    private toastrService: ToastrService) {
    this.bsConfig = Object.assign({},
      {
        containerClass: 'theme-dark-blue',
        dateInputFormat: 'YYYY-MM-DD',
        showWeekNumbers: false,
        adaptivePosition: true
      });
  }

  ngOnInit() {

    if (this.loginService.isSessionExpired()) {
      this.toastrService.warning('The Session has expired. Please re-login', 'Session Expired')
      this.loginService.logOut();
      this.router.navigate(['login']);
    }
    this.addForm = this.formBuilder.group({
      project: ['', Validators.required],
      cstatus: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.addForm.controls; }


  createEmployee(): void {
    this.submitted = true;

    this.jstoday = formatDate(this.today, 'yyyy-MM-dd HH:mm:ss', 'en-US', '+0530');
    this.perfemployee.today = this.jstoday;
    this.perfemployee.cstatus = this.isStatusProper(this.perfemployee.cstatus);
    this.httpClientService.createPerfEmployee(this.perfemployee)
      .subscribe(data => {
        this.toastrService.success('New Project added successfully', 'Action')
        /*this.router.navigate([''])
          .then(nav => { //true if navigation is successful
          },
            err => { // when there's an error
            });*/
      },
        err => this.toastrService.error('New Project creation failed', 'Error')
      );

  };
  createAllPerfEmployee() {
    this.submitted = true;
    this.perfemployees.forEach(element => {

      this.jstoday = formatDate(this.today, 'yyyy-MM-dd HH:mm:ss', 'en-US', '+0530');

      this.createfromExcel(element);     
      this.perfemployeeimport.cstatus = (this.isStatusProper(this.perfemployeeimport.cstatus)).toString();      
      if(!this.perfemployeeimport.cstatus.toString().toLowerCase().includes("completed")){
        this.perfemployeeimport.today = this.jstoday;
      }  
     
      if (this.perfemployeeimport.project != null) {
        if (this.perfemployeeimport.cstatus) {
          if (this.perfemployeeimport.cstatus.includes("Pipeline")){
            console.log(this.perfemployeeimport);
          }
          this.httpClientService.createPerfEmployee(this.perfemployeeimport)
            .subscribe(data => {
              /*this.router.navigate([''])
                .then(nav => { //true if navigation is successful
                },
                  err => { // when there's an error
                  });*/
            },
              err => this.toastrService.error('New Project creation failed', 'Error')
            );
        }
        else {
          this.toastrService.error(this.perfemployeeimport.project + ' doesn' + 't have a status. Please re-import. ', 'Error')
        }
      }
      else {
        this.toastrService.error('New Project creation failed, please re-check the project name', 'Error')
      }
    });
    if(this.perfemployeeimport != null){
      this.toastrService.success('New Projects added successfully', 'Action');
    }
    
  }

  isStatusProper(data: string) {
    if (data != null) {
      if (data.toString().toLowerCase().includes("progress")) {
        data = "In Progress";
      }
      if (data.toString().toLowerCase().includes("hold")) {
        data = "On Hold";
      }
      if (data.toString().toLowerCase().includes("pipeline")) {
        data = "In Pipeline";
      }
      if (data.toString().toLowerCase().includes("completed")) {
        data = "Completed";
      }
    }
    else {
      console.log("Setting default status for " + this.perfemployeeimport.project);
      data = "In Pipeline";
    }
    return data;
  }

  readExcel(event) {
    const file = event.target.files[0];

    xlsxParser
      .onFileSelection(file)
      .then(data => {
        this.dataExtract(data);
      });
  }

  dataExtract(data) {

    var parsedData_O = data.Projects_Ongoing;
    var parsedData_C = data.Projects_Completed;

    if (parsedData_O != null && parsedData_C != null) {     
      var parsedData = parsedData_O.concat(parsedData_C);
    }
    else{
      var parsedData = parsedData_O;
    }   
   
    if (parsedData == null) {
      const message = `Invalid Sheet-Name`;
      const dialogData = new AlertDailogModel("Confirm Action", message);

      const dialogRef = this.alertdialog.open(AlertDailogComponent, {
        maxWidth: "400px",
        data: dialogData
      });
    }    

    for (let i = 0; i < parsedData.length; i++) {

      if (!this.isValidDate(parsedData[i].PSD)) {
        if (this.row_ps != ' ') {
          this.row_ps = this.row_ps + ',' + i;
        }
        else {
          this.row_ps = i.toString();
        }
        parsedData[i].PSD = "";
      }
      if (!this.isValidDate(parsedData[i].PED)) {
        if (this.row_pe != ' ') {
          this.row_pe = this.row_pe + ',' + i;
        }
        else {
          this.row_pe = i.toString();
        }
        parsedData[i].PED = "";
      }
      if (!this.isValidDate(parsedData[i].ASD)) {
        if (this.row_as != ' ') {
          this.row_as = this.row_as + ',' + i;
        }
        else {
          this.row_as = i.toString();
        }
        parsedData[i].ASD = "";
      }
      if (!this.isValidDate(parsedData[i].AED)) {
        if (this.row_ae != ' ') {
          this.row_ae = this.row_ae + ',' + i;
        }
        else {
          this.row_ae = i.toString();
        }
        parsedData[i].AED = "";
      }
    }
    const message = "Invalid Planned start date on rows " + this.row_ps +
      '\n' + '\n' + "Invalid Planned end dates on rows " + this.row_pe + '\n' + '\n' +
      "Invalid Actual start dates on rows " + this.row_as + '\n' + '\n' +
      "Invalid Actual end dates on rows " + this.row_ae ;

    const dialogData = new AlertDailogModel("Confirm Action", message);

    const dialogRef = this.alertdialog.open(AlertDailogComponent, {
      maxWidth: "400px",
      data: dialogData
    });
    this.perfemployees = parsedData;
  }

  createfromExcel(data: any) {
    this.perfemployee.project = data.Project;
    this.perfemployee.customer = data.Customer;
    this.perfemployee.manager = data.QC_Manager;
    this.perfemployee.tstatus = data.Requirement;
    this.perfemployee.scenarios = data.Scenarios;
    this.perfemployee.users = data.Users;
    this.perfemployee.env = data.Env;
    if (data.Status != null) {
      this.perfemployee.cstatus = (this.isStatusProper((data.Status).toLowerCase())).toString();
    }
    this.perfemployee.psdate = this.datepipe.transform(data.PSD, 'yyyy-MM-dd');
    this.perfemployee.pedate = this.datepipe.transform(data.PED, 'yyyy-MM-dd');
    this.perfemployee.asdate = this.datepipe.transform(data.ASD, 'yyyy-MM-dd');
    this.perfemployee.aedate = this.datepipe.transform(data.AED, 'yyyy-MM-dd');
    this.perfemployee.resources = data.Resources;
    this.perfemployee.remark = data.Remarks;
    this.perfemployee.bugid = data.Bug_ID;
    
    this.perfemployeeimport = this.perfemployee;
  }
  importHelp(): void {
    const dialogRef = this.helpdialog.open(HelpDailogComponent, {
      width: '70%',
      height: '75%',
      data: { name: 'req_perf.png' }
    });
  }


  isValidDate(date) {
    const date_regex = /^(([0-9])|([0-2][0-9])|([3][0-1]))\-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\-\d{2}$/;
    return date_regex.test(date);
  }

}