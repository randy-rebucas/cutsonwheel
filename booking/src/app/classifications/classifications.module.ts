import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClassificationsPageRoutingModule } from './classifications-routing.module';

import { ClassificationsPage } from './classifications.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClassificationsPageRoutingModule
  ],
  declarations: [ClassificationsPage]
})
export class ClassificationsPageModule {}
