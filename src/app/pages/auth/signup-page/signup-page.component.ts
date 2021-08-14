import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { CustomValidators } from 'ng2-validation';
import { merge } from 'rxjs';

import { AuthService } from '../services/auth.service';

@UntilDestroy()
@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss']
})
export class SignupPageComponent implements OnInit {
  form = new FormGroup({
    username: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, CustomValidators.email]),
    password: new FormControl(null, [Validators.required])
  });
  state: { submitting: boolean; error: any } = {
    submitting: false,
    error: null
  };

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this._resetErrorOnFormChanges();
  }

  private _resetErrorOnFormChanges(): void {
    merge(
      this.form.controls.email.valueChanges,
      this.form.controls.username.valueChanges,
    )
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        if (this.state.error) {
          this.state.error = null;
        }
      });
  }

  submit(): void {
    this.state.submitting = true;
    this._authService.signup({
      email: this.form.value.email,
      password: this.form.value.password,
      username: this.form.value.username
    })
      .subscribe(
        (resp) => {
          this.state.submitting = false;
          this._snackBar.open(`Account created successfully`, 'Ok', { duration: 5000 });
          this._router.navigate(['']);
        },
        (err: HttpErrorResponse) => {
          this.state.submitting = false;
          this.state.error = err.error;
        }
      );
  }
}
