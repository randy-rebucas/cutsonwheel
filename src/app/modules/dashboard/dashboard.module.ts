import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import {
  MatGridListModule,
  MatCardModule,
  MatIconModule,
  MatMenuModule,
  MatButtonModule
} from '@angular/material';


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    MatGridListModule,
    MatCardModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    RouterModule.forChild([
      { path: '', component: DashboardComponent },
    ])
  ]
})
export class DashboardModule {}
