import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BookNowComponent } from './book-now.component';
import { ServicesComponent } from '../services/services.component';
import {
  MatExpansionModule,
  MatChipsModule,
  MatButtonModule,
  MatListModule,
  MatListOption,
  MatIconModule,
  MatCardModule
} from '@angular/material';
import { CartComponent } from '../cart/cart.component';


@NgModule({
  declarations: [
    BookNowComponent,
    ServicesComponent,
    CartComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatChipsModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatCardModule,
    RouterModule.forChild([
      { path: '', component: BookNowComponent },
      { path: ':classificationId', component: ServicesComponent }
    ])
  ]
})
export class BookNowModule {}
