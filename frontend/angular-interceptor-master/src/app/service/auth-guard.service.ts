import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { HttpClientService } from './httpclient.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthGaurdService implements CanActivate {
  httpClient: any;

  constructor(
    private router: Router, 
    private toastrService: ToastrService,
    private httpClientService: HttpClientService,
    private authService: AuthenticationService) { }

  canActivate(
    route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    if (!this.authService.isUserLoggedIn()) {
      localStorage.setItem('authRedirect', state.url);
    }

    if (this.authService.isUserLoggedIn()) {
      // authorised so return true
        return true;
      }  

      // not logged in so redirect to login page with the return url
      this.router.navigate(['login'], { queryParams: { returnUrl: state.url } });
      return false;

        }     
      }
  