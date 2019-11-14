import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BookNowComponent } from './book-now.component';


@NgModule({
  declarations: [
    BookNowComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: BookNowComponent },
    ])
  ]
})
export class BookNowModule {}
