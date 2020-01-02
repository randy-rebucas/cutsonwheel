import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewBookingPage } from './new-booking.page';

const routes: Routes = [
  {
    path: '',
    component: NewBookingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewBookingPageRoutingModule {}
