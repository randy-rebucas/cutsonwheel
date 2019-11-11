import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BookNowComponent } from 'src/app/public/book-now/book-now.component';
import { ServicesComponent } from 'src/app/components/services/services.component';
import { CartComponent } from 'src/app/components/cart/cart.component';
import {
  MatButtonModule,
  MatChipsModule,
  MatIconModule,
  MatListModule,
  MatCardModule,
  MatExpansionModule
} from '@angular/material';



@NgModule({
  declarations: [
    BookNowComponent,
    ServicesComponent,
    CartComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatExpansionModule,
    RouterModule.forChild([
        { path: '', component: BookNowComponent },
        { path: ':classificationId', component: ServicesComponent },
        {
          path: ':classificationId/checkout',
          loadChildren: './../../modules/checkout/checkout.module#CheckoutModule'
        }
    ])
  ]
})
export class BookNowModule { }
