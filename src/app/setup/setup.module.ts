import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';


import { AccountComponent } from './account/account.component';
import { SetupComponent } from './setup.component';
import { DocumentsComponent } from './documents/documents.component';
import {
  MatFormFieldModule,
  MatProgressSpinnerModule,
  MatInputModule,
  MatButtonModule,
  MatCheckboxModule,
  MatTabsModule,
  MatIconModule,
  MatProgressBarModule
} from '@angular/material';

@NgModule({
  declarations: [
    SetupComponent,
    AccountComponent,
    DocumentsComponent
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
    MatIconModule,
    MatProgressBarModule,
    FlexLayoutModule.withConfig({addFlexToParent: false}),
    RouterModule.forChild([
      { path: ':userId', component: SetupComponent, children: [
        { path: '', redirectTo: 'account', pathMatch: 'full' },
        { path: 'account', component: AccountComponent },
        { path: 'documents', component: DocumentsComponent }
      ] },
    ])
  ]
})
export class SetupModule {}
