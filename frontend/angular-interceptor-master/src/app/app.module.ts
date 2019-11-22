import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { CustomMaterialModule } from './core/material.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import {MatDatepickerModule, MatInputModule,MatNativeDateModule} from '@angular/material';
import { FlexLayoutModule } from "@angular/flex-layout";
import { DatePipe, LocationStrategy, HashLocationStrategy } from '@angular/common'

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { AppComponent } from './app.component';
import { EmployeeComponent } from './employee/employee.component';
import { AddDetailsComponent } from './add-details/add-details.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { BasicAuthHtppInterceptorService } from './service/basic-auth-htpp-interceptor.service';
import '../assets/login-animation.js';
import { FilterPipe }from './helpers/filter.pipe';
import { AuthGaurdService } from './service/auth-guard.service';
import { AdminAuthGuard } from './service/admin-auth-guard.service';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { ToastrModule } from 'ngx-toastr';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UpdateDetailsComponent } from './update-details/update-details.component';
import { PerformanceComponent } from './performance/performance.component';
import { PerfUpdateDetailsComponent } from './perf-update-details/perf-update-details.component';
import { HomepageComponent } from './homepage/homepage.component';
import { PerfAddDetailsComponent } from './perf-add-details/perf-add-details.component';
import { HelpDailogComponent } from './help-dailog/help-dailog.component';
import { AlertDailogComponent } from './alert-dailog/alert-dailog.component';


@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    AddDetailsComponent,
    HeaderComponent,
    LoginComponent,
    LogoutComponent,
    ConfirmationDialogComponent,
    FilterPipe,
    UpdateDetailsComponent,
    PageNotFoundComponent,
    PerformanceComponent,
    PerfUpdateDetailsComponent,
    HomepageComponent,
    PerfAddDetailsComponent,
    HelpDailogComponent,
    AlertDailogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, 
    BrowserAnimationsModule,
    CustomMaterialModule,   
    FormsModule,
    ReactiveFormsModule, 
    MatDatepickerModule, 
    MatInputModule,
    MatNativeDateModule,
    NgbModule,
    BsDatepickerModule.forRoot(),
    ToastrModule.forRoot(),    
    FlexLayoutModule
  ],  
  entryComponents: [    
    LoginComponent,
    ConfirmationDialogComponent,
    UpdateDetailsComponent,
    PerfUpdateDetailsComponent,
    HelpDailogComponent,
    AlertDailogComponent
  ],
  providers: [
    DatePipe,
    AuthGaurdService,
    AdminAuthGuard,
  {  
    provide:HTTP_INTERCEPTORS, useClass:BasicAuthHtppInterceptorService, multi:true 
  },
  {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
