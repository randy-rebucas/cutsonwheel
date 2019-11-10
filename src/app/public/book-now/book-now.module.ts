import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
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
  MatRippleModule,
  MAT_CHECKBOX_CLICK_ACTION
} from '@angular/material';

import { BookNowComponent } from './book-now.component';
import { ServicesComponent } from './services/services.component';
import { LocationComponent } from './location/location.component';
import { AssistantComponent } from './assistant/assistant.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { SummaryComponent } from './summary/summary.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { PaymentComponent } from './payment/payment.component';
import { CustomerComponent } from './customer/customer.component';
import { StartComponent } from './start/start.component';
import { CartComponent } from 'src/app/_shared/cart/cart.component';


@NgModule({
  declarations: [
    BookNowComponent,
    ServicesComponent,
    LocationComponent,
    AssistantComponent,
    ScheduleComponent,
    SummaryComponent,
    ConfirmationComponent,
    PaymentComponent,
    CustomerComponent,
    StartComponent,
    CartComponent
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
        apiKey: 'AIzaSyChlo0KGVk9ZywD1IRqjluX99k2zku32Fc',
        libraries: ['places']
    }),
    RouterModule.forChild([
        { path: '', component: BookNowComponent },
        { path: ':classificationId', component: ServicesComponent },
        { path: ':classificationId/checkout', component: StartComponent, children: [
          { path: '', redirectTo: 'assistant', pathMatch: 'full' },
          { path: 'assistant', component: AssistantComponent },
          { path: 'schedule', component: ScheduleComponent },
          { path: 'customer', component: CustomerComponent },
          { path: 'summary', component: SummaryComponent },
          { path: 'confirmation', component: ConfirmationComponent },
          { path: 'payment', component: PaymentComponent }
        ] }
    ])
  ],
  providers: [
    {provide: MAT_CHECKBOX_CLICK_ACTION, useValue: 'check'}
  ]
})
export class BookNowModule {}
