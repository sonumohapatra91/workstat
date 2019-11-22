import { Component, OnInit, ElementRef, Renderer } from '@angular/core';
import { Performance, HttpClientService } from '../service/httpclient.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';
import { MatDialog } from '@angular/material';
import { UpdateDetailsComponent } from '../update-details/update-details.component';
import { ConfirmDialogModel, ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { PerfUpdateDetailsComponent } from '../perf-update-details/perf-update-details.component';
import { copyStyles } from '@angular/animations/browser/src/util';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-performance',
  templateUrl: './performance.component.html',
  styleUrls: ['./performance.component.css']
})
export class PerformanceComponent implements OnInit {

  perfemployees: Performance[];
  perffilter_employee: Performance[];
  perfprog_employees: Performance[];
  perfhold_employees: Performance[];
  perfpipe_employees: Performance[];
  perfcomplete_employees: Performance[];
  public searchText: string;
  public btnText: string;
  public show: boolean = false;
  public buttonClass = 'fa-angle-double-down';
  public selectedRow: any;
  public result: boolean;

  constructor(
    private router: Router,
    private toastrService: ToastrService,
    public loginService: AuthenticationService,
    private httpClientService: HttpClientService,
    private el: ElementRef,
    public confirmdialog: MatDialog,
    public updatedialog: MatDialog,
    private renderer: Renderer
  ) {
    this.searchText = "";
  }

  ngOnInit() {
    if (this.loginService.isSessionExpired()) {
      this.toastrService.warning('The Session has expired. Please re-login', 'Session Expired')
      this.loginService.logOut();
      this.router.navigate(['login']);

    }
    this.httpClientService.getPerfEmployees().subscribe(
      response => this.handleSuccessfulResponse(response),
    );
  }

  handleSuccessfulResponse(response) {
    this.perfemployees = response;
    this.perfprog_employees = [];
    this.perfhold_employees = [];
    this.perfpipe_employees = [];
    this.perfcomplete_employees = [];

    this.perfemployees.forEach(element => {
      if (element.cstatus == "In Progress") {
        this.perfprog_employees.push(element);
      }
      if (element.cstatus == "In Pipeline") {
        this.perfpipe_employees.push(element);
      }
      if (element.cstatus == "On Hold") {
        this.perfhold_employees.push(element);
      }
      if (element.cstatus == "Completed") {
        this.perfcomplete_employees.push(element);
      }
    });
    this.toastrService.success('Showing all ongoing projects', 'Projects')
    this.btnFilter("ongoing");
  }
  btnFilter(btname: any) {
    this.btnText = btname;
    this.perffilter_employee = [];


    if (this.btnText.toLowerCase() == "ongoing") {
      this.perffilter_employee = this.perfprog_employees.concat(this.perfhold_employees, this.perfpipe_employees);
    }
    if (this.btnText.toLowerCase() == "in progress") {
      this.perffilter_employee = this.perfprog_employees;
    }
    if (this.btnText.toLowerCase() == "in pipeline") {
      this.perffilter_employee = this.perfpipe_employees;
    }
    if (this.btnText.toLowerCase() == "on hold") {
      this.perffilter_employee = this.perfhold_employees;
    }
    if (this.btnText.toLowerCase() == "completed") {
      this.perffilter_employee = this.perfcomplete_employees;
    }
  }

  toggle(i: any) {
    this.selectedRow = i;
    this.show = !this.show;

    // CHANGE THE NAME OF THE BUTTON.
    if (this.show) {
      this.buttonClass = "fa-angle-double-up";
    }
    else {
      this.buttonClass = "fa-angle-double-down";
    }
  }


  updatePerfDetails(obj: Performance): void {
    if (this.loginService.isSessionExpired()) {
      this.toastrService.warning('The Session has expired. Please re-login', 'Session Expired')
      this.loginService.logOut();
      this.router.navigate(['login']);
    }
    this.updatedialog.open(PerfUpdateDetailsComponent, {
      panelClass: 'custom-dialog',
      data: obj
    });
  }
  delallBtn() {
    const messageAll = `Are you sure you want to do this?`;
    const dialogDataAll = new ConfirmDialogModel("Confirm Action", messageAll);

    const dialogRefAll = this.confirmdialog.open(ConfirmationDialogComponent, {
      maxWidth: "400px",
      data: dialogDataAll
    });
    dialogRefAll.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {       
        this.httpClientService.deleteAllPerfEmployee()
          .subscribe(data => { 
            this.toastrService.success('Delete successful', 'Action')
            window.location.reload()
          },
            err => this.toastrService.error('Delete unsuccessful', 'Error')
          );
      }
    });
  }
  deletePerfEmployee(perfemployee: Performance): void {

    if (this.loginService.isSessionExpired()) {
      this.toastrService.warning('The Session has expired. Please re-login', 'Session Expired')
      this.loginService.logOut();
      this.router.navigate(['login']);
    }

    const message = `Are you sure you want to do this?`;
    const dialogData = new ConfirmDialogModel("Confirm Action", message);

    const dialogRef = this.confirmdialog.open(ConfirmationDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {

      if (dialogResult) {
        this.httpClientService.deletePerfEmployee(perfemployee)
          .subscribe(data => {
            this.toastrService.success('Delete successful', 'Action')
            window.location.reload()
          },
            err => this.toastrService.error('Delete unsuccessful', 'Error')
          );
      }
      else {
        console.log('cancelled by user');

      }
    });
  };
}
