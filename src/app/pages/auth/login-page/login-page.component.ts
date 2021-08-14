import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

interface ILoginFormState {
  loggingIn: boolean;
  error: any | null;
}
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  state: ILoginFormState = {
    loggingIn: false,
    error: null
  };

  form = new FormGroup({
    username: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required])
  });
  constructor(
    private _authService: AuthService,
    private _router: Router
  ) {}

  ngOnInit(): void {
  }
  submit(): void {
    this.state.loggingIn = true;
    this._authService.login({
      username: this.form.value.username,
      password: this.form.value.password
    })
    .subscribe(
      (resp) => {
        this.state.loggingIn = false;
        this._router.navigate(['']);
      },
      (exc: HttpErrorResponse) => {
        this.state.loggingIn = false;
        this.state.error = exc.error;
      }
    )
  }
}
