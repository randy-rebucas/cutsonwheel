import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';

import { CheckoutComponent } from 'src/app/public/checkout/checkout.component';
import { StepsOneComponent } from 'src/app/public/checkout/steps-one/steps-one.component';
import { StepsTwoComponent } from 'src/app/public/checkout/steps-two/steps-two.component';
import { StepsThreeComponent } from 'src/app/public/checkout/steps-three/steps-three.component';
import { StepsFourComponent } from 'src/app/public/checkout/steps-four/steps-four.component';
import { StepsFiveComponent } from 'src/app/public/checkout/steps-five/steps-five.component';
import { StepsSixComponent } from 'src/app/public/checkout/steps-six/steps-six.component';

import { AssistantsComponent } from 'src/app/components/assistants/assistants.component';
import { LocationComponent } from 'src/app/components/location/location.component';
import { ScheduleComponent } from 'src/app/components/schedule/schedule.component';
import { SummaryComponent } from 'src/app/components/summary/summary.component';
import { ConfirmationComponent } from 'src/app/components/confirmation/confirmation.component';
import { PaymentComponent } from 'src/app/components/payment/payment.component';
import { CustomerComponent } from 'src/app/components/customer/customer.component';

import {
  MatInputModule,
  MatFormFieldModule,
  MatButtonModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatChipsModule,
  MatCardModule,
  MatCheckboxModule,
  MatRadioModule,
  MatTabsModule,
  MatIconModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatListModule,
  MatExpansionModule,
  MatTableModule,
  MatRippleModule
} from '@angular/material';
import { LoginComponent } from 'src/app/components/login/login.component';
import { RegisterComponent } from 'src/app/components/register/register.component';


@NgModule({
  declarations: [
    CheckoutComponent,
    StepsOneComponent,
    StepsTwoComponent,
    StepsThreeComponent,
    StepsFourComponent,
    StepsFiveComponent,
    StepsSixComponent,
    AssistantsComponent,
    LocationComponent,
    ScheduleComponent,
    SummaryComponent,
    ConfirmationComponent,
    PaymentComponent,
    CustomerComponent,
    LoginComponent,
    RegisterComponent
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
    MatChipsModule,
    MatCardModule,
    MatCheckboxModule,
    MatRadioModule,
    MatTabsModule,
    MatIconModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatListModule,
    MatExpansionModule,
    MatTableModule,
    MatRippleModule,
    FlexLayoutModule.withConfig({addFlexToParent: false}),
    AgmCoreModule.forRoot({
        apiKey: 'AIzaSyA51S6g_jslQBgvkk5Jtz24ANOv6WOiD5o',
        // libraries: ['places']
    }),
    RouterModule.forChild([
        { path: '', component: CheckoutComponent, children: [
          { path: '', redirectTo: 'step-one', pathMatch: 'full' },
          { path: 'step-one', component: StepsOneComponent }, // select an assistant
          { path: 'step-two', component: StepsTwoComponent }, // select an schedule
          { path: 'step-three', component: StepsThreeComponent }, // identify your customer
          { path: 'step-four', component: StepsFourComponent }, // show cart summary
          { path: 'step-five', component: StepsFiveComponent }, // view confirmation
          { path: 'step-six', component: StepsSixComponent } // show payment option
        ] }
    ])
  ],
})
export class CheckoutModule { }
