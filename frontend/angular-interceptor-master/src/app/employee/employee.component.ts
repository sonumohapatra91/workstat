import { Component, OnInit, Pipe, PipeTransform, ViewChild, ElementRef, Renderer } from '@angular/core';
import { Router } from "@angular/router";
import { HttpClientService, Employee } from '../service/httpclient.service';
import { FilterPipe } from '../helpers/filter.pipe';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthenticationService } from '../service/authentication.service';
//import { ConfirmationDialogService } from '../confirmation-dialog/confirmation-dialog.service';
import { ConfirmDialogModel, ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { MatDialog, Sort } from '@angular/material';
import { UpdateDetailsComponent } from '../update-details/update-details.component';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  employees: Employee[];
  filter_employee: Employee[];
  prog_employees: Employee[];
  hold_employees: Employee[];
  pipe_employees: Employee[];
  complete_employees: Employee[];
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
    this.httpClientService.getEmployees().subscribe(
      response => this.handleSuccessfulResponse(response),
    );
  }


  handleSuccessfulResponse(response) {
    this.employees = response;
    this.prog_employees = [];
    this.hold_employees = [];
    this.pipe_employees = [];
    this.complete_employees = [];

    this.employees.forEach(element => {
      if (element.cstatus == "In Progress") {
        this.prog_employees.push(element);
      }
      if (element.cstatus == "In Pipeline") {
        this.pipe_employees.push(element);
      }
      if (element.cstatus == "On Hold") {
        this.hold_employees.push(element);
      }
      if (element.cstatus == "Completed") {
        this.complete_employees.push(element);
      }
    });
    this.toastrService.success('Showing all ongoing projects', 'Projects')
    this.btnFilter("ongoing");
  }

  btnFilter(btname: string) {
    this.btnText = btname;
    this.filter_employee = [];
    if (this.btnText.toLowerCase() == "ongoing") {
      this.filter_employee = this.prog_employees.concat(this.hold_employees, this.pipe_employees);
    }
    if (this.btnText.toLowerCase() == "in progress") {
      this.filter_employee = this.prog_employees;
    }
    if (this.btnText.toLowerCase() == "in pipeline") {
      this.filter_employee = this.pipe_employees;
    }
    if (this.btnText.toLowerCase() == "on hold") {
      this.filter_employee = this.hold_employees;
    }
    if (this.btnText.toLowerCase() == "completed") {
      this.filter_employee = this.complete_employees;
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


  updateDetails(obj: Employee): void {
    if (this.loginService.isSessionExpired()) {
      this.toastrService.warning('The Session has expired. Please re-login', 'Session Expired')
      this.loginService.logOut();
      this.router.navigate(['login']);
    }
    this.updatedialog.open(UpdateDetailsComponent, {
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
        this.httpClientService.deleteAllEmployee()
          .subscribe(data => { 
            this.toastrService.success('Delete successful', 'Action')
            window.location.reload()
          },
            err => this.toastrService.error('Delete unsuccessful', 'Error')
          );
      }
    });
  }
  deleteEmployee(employee: Employee): void {

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
        this.httpClientService.deleteEmployee(employee)
          .subscribe(data => {
            //this.filter_employee = this.filter_employee.filter(u => u !== employee);
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
