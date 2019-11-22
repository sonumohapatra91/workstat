import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';
import { FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import '../../assets/login-animation.js';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  unamePattern = "^[a-z0-9_-]{8,15}$";
  pwdPattern = "^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,12}$";
  aloginForm: FormGroup;
  isSubmitted = false;
  invalidLogin = false;

  constructor(
    private router: Router, 
    private fb: FormBuilder,
    private toastrService :ToastrService,
    public loginservice: AuthenticationService) {
      
  }
  ngOnInit() {
    this.aloginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    // reset login status
    this.loginservice.logOut();
  }

  // convenience getter for easy access to form fields
  get f() { return this.aloginForm.controls; }


  ngAfterViewInit() {
    (window as any).initialize();
  }

  checkLogin() {
    this.isSubmitted = false;

     // stop here if form is invalid
     if (this.aloginForm.invalid) {
      this.toastrService.error('Username and Password are required','Login failed');
      return;
      }    
    (this.loginservice.authenticate(this.aloginForm.value.username, this.aloginForm.value.password).subscribe(
      data => {       
        this.router.navigate(['']);
        this.invalidLogin = false;
      },
      error => {
        this.invalidLogin = true;
        this.toastrService.error('Incorrect Username or Password','Login failed')
      }
    )
    );

  }
}
