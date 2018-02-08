/** 
*@author Hdev <hdev0301@gmail.com>
*/

import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpModule, Http, Headers, Response, RequestOptions } from '@angular/http';
import { User } from './../../../../models/user.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/mergeMap';
import { environment } from './../../../../../../environments/environment';
import { LoginService } from './../../../../services/users/login.service';
import { RegisterService } from './../../../../services/users/register.service';
import { Handler } from './../../../../services/handler';
import { AbstractControl } from '@angular/forms';

import {
  Router,
  ActivatedRoute
} from '@angular/router';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';

@Injectable()

@Component({
  selector: 'auth',
  styleUrls: ['./auth.component.css'],
  templateUrl: './auth.component.html',
  providers: [
    LoginService,
    RegisterService,
  ],
})

export class AuthComponent {
  public loginForm: FormGroup;
  public registerForm: FormGroup;
  public formErrors;
  public registerFormErrors;

  constructor(
    public route: ActivatedRoute,
    private loginService: LoginService,
    private registerService: RegisterService,
    private fb: FormBuilder,
    private router: Router
  ) {

  }

  public ngOnInit() {
    this.createForm();
    this.createRegForm();
  }

  /**
 * login form
 */
  public createForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
    },
    );
  }

  public onLoginSubmit() {
    let params: any = {
      grant_type: 'password',
      client_id: environment.clientID,
      client_secret: environment.clientSecret,
      username: this.loginForm.value.email,
      password: this.loginForm.value.password
    };
    this.loginService.login(params).subscribe(
      (data) => {
        localStorage.setItem('currentUser', (String)(data.id));
        this.router.navigate(['users/profile']);
      },
      (errors) => {
        this.formErrors = errors;
      }
    );
  }

  /**
   * registeraton form
   */
  public createRegForm() {
    this.registerForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      confirmPassword: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    },
      { validator: this.checkIfMatchingPasswords('password', 'confirmPassword') },
    );
  }

  /**
 * matches two password
 * @param passwordKey 
 * @param passwordConfirmationKey 
 */
  public checkIfMatchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
      let passwordInput = group.controls[passwordKey],
        passwordConfirmationInput = group.controls[passwordConfirmationKey];
      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({ notEquivalent: true })
      }
      else {
        return passwordConfirmationInput.setErrors(null);
      }
    }
  }

  public onRegisterSubmit() {
    let params: any = {
      email: this.registerForm.value.email,
      password: this.registerForm.value.password
    };
    this.registerService.register(params).subscribe(
      (data) => {
        localStorage.setItem('currentUser', (String)(data.id));
        this.router.navigate(['users/profile']);
      },
      (errors) => {
        this.registerFormErrors = errors;
      }
    );
  }

}
