import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ClassificationComponent } from './classification.component';
import { ClassificationListComponent } from './classification-list/classification-list.component';
import { ClassificationFormComponent } from './classification-form/classification-form.component';
import { ClassificationDetailComponent } from './classification-detail/classification-detail.component';
import {
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatProgressSpinnerModule,
  MatCardModule,
  MatIconModule,
  MatListModule,
  MatProgressBarModule,
} from '@angular/material';

@NgModule({
  declarations: [
    ClassificationComponent,
    ClassificationListComponent,
    ClassificationFormComponent,
    ClassificationDetailComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatIconModule,
    MatListModule,
    FlexLayoutModule.withConfig({addFlexToParent: false}),
    RouterModule.forChild([
      { path: '', component: ClassificationComponent, children: [
        { path: '', redirectTo: 'list', pathMatch: 'full' },
        { path: 'list', component: ClassificationListComponent },
        { path: 'form', component: ClassificationFormComponent },
        { path: ':classificationId', component: ClassificationDetailComponent },
        { path: ':classificationId/edit', component: ClassificationFormComponent }
      ] },
    ])
  ]
})
export class ClassificationModule {}
