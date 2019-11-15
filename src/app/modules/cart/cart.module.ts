import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartComponent } from './cart.component';
import { MatCardModule, MatListModule, MatIconModule } from '@angular/material';


@NgModule({
  declarations: [
    CartComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    RouterModule.forChild([
      { path: '', component: CartComponent },
    ])
  ]
})
export class CartModule {}
