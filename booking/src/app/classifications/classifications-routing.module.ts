import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClassificationsPage } from './classifications.page';

const routes: Routes = [
  {
    path: '',
    component: ClassificationsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClassificationsPageRoutingModule {}
