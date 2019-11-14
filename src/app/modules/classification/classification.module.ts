import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import {
  MatChipsModule,
  MatInputModule,
  MatFormFieldModule,
  MatButtonModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatCardModule,
  MatIconModule,
  MatListModule
} from '@angular/material';
import { HttpLoaderFactory } from 'src/app/app.module';
import { ClassificationComponent } from './classification.component';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import { AuthenticationGuard } from '../authentication/authentication.guard';
import { DetailComponent } from './detail/detail.component';

@NgModule({
  declarations: [
    ClassificationComponent,
    ListComponent,
    FormComponent,
    DetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatChipsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatIconModule,
    MatListModule,
    HttpClientModule,
    TranslateModule.forChild({
        loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
        }
    }),
    RouterModule.forChild([
      { path: '', component: ClassificationComponent, children: [
        { path: '', redirectTo: 'list', pathMatch: 'full' },
        { path: 'list', component: ListComponent },
        { path: 'form', component: FormComponent, canActivate: [AuthenticationGuard] },
        { path: ':classificationId', component: DetailComponent },
        { path: ':classificationId/edit', component: FormComponent, canActivate: [AuthenticationGuard]  }
      ] },
    ])
  ]
})
export class ClassificationModule { }
