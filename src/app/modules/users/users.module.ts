import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import {
  MatInputModule,
  MatFormFieldModule,
  MatProgressSpinnerModule,
  MatButtonModule,
  MatCheckboxModule,
  MatTabsModule
} from '@angular/material';

import { UsersComponent } from 'src/app/private/users/users.component';



@NgModule({
  declarations: [
    UsersComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTabsModule,
    FlexLayoutModule.withConfig({addFlexToParent: false}),
    RouterModule.forChild([
      { path: '', component: UsersComponent },
    ])
  ]
})
export class UsersModule { }
