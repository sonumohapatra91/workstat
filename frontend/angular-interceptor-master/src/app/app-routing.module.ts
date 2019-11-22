import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { AddDetailsComponent } from './add-details/add-details.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { AuthGaurdService } from './service/auth-guard.service';
import { AdminAuthGuard } from './service/admin-auth-guard.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PerformanceComponent } from './performance/performance.component';
import { HomepageComponent } from './homepage/homepage.component';
import { PerfAddDetailsComponent } from './perf-add-details/perf-add-details.component';

const routes: Routes = [
  { path: '', component: HomepageComponent,canActivate:[AuthGaurdService] },
  { path: 'performance', component: PerformanceComponent, canActivate:[AuthGaurdService]},
  { path: 'security', component: EmployeeComponent,canActivate:[AuthGaurdService]},
  { path: 'adddetails', component: AddDetailsComponent,canActivate:[AdminAuthGuard]},
  { path: 'addperfdetails', component: PerfAddDetailsComponent,canActivate:[AdminAuthGuard]},
  { path: 'login', component: LoginComponent, pathMatch:'prefix' },
  { path: 'logout', component: LogoutComponent,canActivate:[AuthGaurdService] },
  { path: '404', component: PageNotFoundComponent},
  { path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled',
  }),
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
