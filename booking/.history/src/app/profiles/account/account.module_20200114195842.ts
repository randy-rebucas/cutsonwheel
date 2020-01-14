import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccountPageRoutingModule } from './account-routing.module';

import { AccountPage } from './account.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { UploadProfilePictureComponent } from '../upload-profile-picture/upload-profile-picture.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccountPageRoutingModule,
    SharedModule
  ],
  declarations: [AccountPage],
  entryComponents: [UploadProfilePictureComponent]
})
export class AccountPageModule {}
