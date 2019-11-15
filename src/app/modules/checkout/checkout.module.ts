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
import {
  MatTabsModule,
  MatListModule,
  MatIconModule
} from '@angular/material';



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
    MatTabsModule,
    MatListModule,
    MatIconModule,
    RouterModule.forChild([
      { path: '', component: CheckoutComponent, children: [
        { path: '', redirectTo: 'step-one', pathMatch: 'full' },
        { path: 'step-one', component: AssistantComponent }, // select an assistant
        { path: 'step-two', component: ScheduleComponent }, // select an schedule
        { path: 'step-three', component: CustomerComponent }, // identify your customer
        { path: 'step-four', component: SummaryComponent }, // show cart summary
        { path: 'step-five', component: ConfirmationComponent }, // view confirmation
        { path: 'step-six', component: PaymentComponent } // show payment option
      ] }
    ])
  ]
})
export class CheckoutModule {}
