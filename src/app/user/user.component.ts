import { Component, OnInit } from '@angular/core';

import { AppService } from '../services/app.service';

@Component({
  selector: 'app-user',
  template: `
    <mat-card class="card">
      <h1>Edit Info</h1>
      <div class="field-container">
        <mat-form-field>
          <input matInput [(ngModel)]="app.user.firstName" placeholder="First Name">
        </mat-form-field>
        <br />
        <mat-form-field>
          <input matInput [(ngModel)]="app.user.lastName" placeholder="Last Name">
        </mat-form-field>
        <button mat-raised-button color="primary" (click)="updateUser()">Save Changes</button>
      </div>
    </mat-card>
  `,
  styles: []
})
export class UserComponent implements OnInit {

  constructor(public app: AppService) { }

  ngOnInit() {
    this.app.getUser();
  }

  updateUser() {
    this.app.updateUser();
  }

}