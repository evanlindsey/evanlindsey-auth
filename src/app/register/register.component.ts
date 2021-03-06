import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { AuthService } from '../services/auth.service';
import { AuthGuardService } from '../services/auth-guard.service';

@Component({
  selector: 'app-register',
  template: `
    <mat-card>
      <h1>Register</h1>
      <form [formGroup]="form" (ngSubmit)="onRegister()">
        <div class="field-container">
          <mat-form-field>
            <input matInput placeholder="First Name" formControlName="firstName">
          </mat-form-field>
          <br />
          <mat-form-field>
            <input matInput placeholder="Last Name" formControlName="lastName">
          </mat-form-field>
          <br />
          <mat-form-field>
            <input matInput placeholder="Email" type="email" formControlName="userName">
          </mat-form-field>
          <br />
          <mat-form-field>
            <input matInput placeholder="Password" type="password" formControlName="password">
          </mat-form-field>
          <br />
          <mat-form-field>
            <input matInput placeholder="Confirm Password" type="password" formControlName="confirmPassword">
          </mat-form-field>
          <br />
          <span *ngIf="form.errors?.mismatchedFields">Passwords do not match</span>
          <br />
          <button mat-raised-button color="primary" [disabled]="!form.valid">Register</button>
        </div>
      </form>
    </mat-card>
  `,
  styles: []
})
export class RegisterComponent implements OnInit {

  form;

  constructor(private fb: FormBuilder, private auth: AuthService, private authGuard: AuthGuardService) {
    this.form = fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      userName: ['', [Validators.required, auth.emailValid()]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, { validator: matchingFields('password', 'confirmPassword') });
  }

  ngOnInit() {
    if (this.authGuard.isAuthenticated) {
      this.authGuard.returnToApp();
    }
  }

  onRegister() {
    if (this.form.valid) {
      this.auth.register(this.form.value);
    }
  }

}

function matchingFields(field1, field2) {
  return form => {
    if (form.controls[field1].value !== form.controls[field2].value) {
      return { mismatchedFields: true };
    }
  };
}
