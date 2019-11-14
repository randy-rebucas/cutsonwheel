import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SetupComponent } from './setup.component';
import { AccountComponent } from './account/account.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatTabsModule,
  MatFormFieldModule,
  MatRadioModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatInputModule,
  MatDatepickerModule,
  MatSelectModule,
  MatIconModule,
  MatNativeDateModule,
  MatButtonModule
} from '@angular/material';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpLoaderFactory } from 'src/app/app.module';


@NgModule({
  declarations: [
    SetupComponent,
    AccountComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
    MatTabsModule,
    MatRadioModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    HttpClientModule,
    TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
        }
    }),
    RouterModule.forChild([
      { path: '', component: SetupComponent, children: [
        { path: '', redirectTo: 'account', pathMatch: 'full' },
        { path: 'account', component: AccountComponent },
        // { path: 'classifications', component: ClassificationOptionComponent },
        // { path: 'documents', component: DocumentsComponent },
        // { path: 'complete', component: CompleteComponent }
      ] },
    ])
  ]
})
export class SetupModule {}
