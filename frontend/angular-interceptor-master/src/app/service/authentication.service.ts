import { Injectable, SystemJsNgModuleLoader } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { tap } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import * as jwt_decode from 'jwt-decode';

import { User } from '../model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';

export class JwtResponse {
  constructor( ) { }
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  jstoday = '';
  expiryDate = '';
  private cfgApiBaseUrl: string ='http://***.***.***.**:9999/jwt-app/';
  //private cfgApiBaseUrl: string ='http://localhost:8080/';

  constructor(
    private toastrService: ToastrService,        
    private router: Router,
    private httpClient: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('username')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {    
    return this.currentUserSubject.value;
  }

  authenticate(username, password) {    
    return this.httpClient.post<any>(this.cfgApiBaseUrl + 'authenticate',{username,password})
    .pipe(tap(userData => {              
        sessionStorage.setItem('username', username);      
        let tokenStr = 'Bearer ' + userData.token;
        sessionStorage.setItem('token', tokenStr);      
        return userData;
      },
      err => console.log(err)
      )
    );
  }
  
  isUserLoggedIn() {
    let user = sessionStorage.getItem('username');
    let token = sessionStorage.getItem('token');    
   
    if (user && token)
       return !(user === null);     
  }

  isAdmin(){    
    let token = sessionStorage.getItem('token');
    var decoded = jwt_decode(token);         
    if('ROLE_ADMIN' == (decoded.scopes.toString())){
      return true;
    }
    return false;
  }

  isSessionExpired(){
    let token = sessionStorage.getItem('token'); 
    var decoded = jwt_decode(token); 
    this.jstoday = formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss', 'en-US', '+0530');
    this.expiryDate = formatDate(((decoded.exp) * 1000), 'yyyy-MM-dd HH:mm:ss', 'en-US', '+0530');   
    console.log("Session will expire at " + this.expiryDate); 
     if(this.expiryDate < this.jstoday ){
       console.log("Session Expired ");     
      return true;
     }
     return false;
  }

  logOut() {
    sessionStorage.removeItem('username');
    this.currentUserSubject.next(null);
  }
}
