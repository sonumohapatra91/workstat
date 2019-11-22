import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';

import { AuthenticationService } from './authentication.service';

@Injectable()
export class AdminAuthGuard implements CanActivate {
  constructor(private router: Router, 
    private authService: AuthenticationService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isUserLoggedIn = this.authService.isUserLoggedIn();
    const isAdmin = this.authService.isAdmin();
    if (isUserLoggedIn && isAdmin) {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
}