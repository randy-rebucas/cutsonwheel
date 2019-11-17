import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CheckoutComponent } from './checkout.component';
import { AssistantComponent } from './assistant/assistant.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { CustomerComponent } from './customer/customer.component';
import { SummaryComponent } from './summary/summary.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { PaymentComponent } from './payment/payment.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatTabsModule,
  MatListModule,
  MatIconModule,
  MatFormFieldModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatInputModule,
  MatButtonModule,
  MatCheckboxModule,
  MatCardModule,
  MatRadioModule
} from '@angular/material';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpLoaderFactory } from 'src/app/app.module';
import { BarRatingModule } from 'ngx-bar-rating';

@NgModule({
  declarations: [
    CheckoutComponent,
    AssistantComponent,
    ScheduleComponent,
    CustomerComponent,
    SummaryComponent,
    ConfirmationComponent,
    PaymentComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatTabsModule,
    MatListModule,
    MatIconModule,
    MatCheckboxModule,
    MatCardModule,
    MatRadioModule,
    HttpClientModule,
    BarRatingModule,
    TranslateModule.forChild({
        loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
        }
    }),
    RouterModule.forChild([
      { path: '', component: CheckoutComponent, children: [
        { path: '', redirectTo: 'step-one', pathMatch: 'full' },
        { path: 'step-one', component: AssistantComponent }, // select an assistant
        { path: 'step-two', component: ScheduleComponent }, // select an schedule
        { path: 'step-three', component: CustomerComponent }, // identify your customer
        { path: 'step-four', component: SummaryComponent }, // show cart summary
        { path: 'step-five', component: PaymentComponent }, // view confirmation
        // { path: 'step-six', component: PaymentComponent } // show payment option
      ] }
    ])
  ]
})
export class CheckoutModule {}
