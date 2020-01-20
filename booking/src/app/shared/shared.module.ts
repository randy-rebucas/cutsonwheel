import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { LocationPickerComponent } from './components/location-picker/location-picker.component';
import { MapModalComponent } from './components/map-modal/map-modal.component';
import { ImagePickerComponent } from './components/image-picker/image-picker.component';
import { FormsModule } from '@angular/forms';
import { TimestampPipe } from './pipes/timestamp.pipe';

@NgModule({
  declarations: [
    LocationPickerComponent,
    MapModalComponent,
    ImagePickerComponent,
    TimestampPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  exports: [
    LocationPickerComponent,
    MapModalComponent,
    ImagePickerComponent
  ],
  entryComponents: [MapModalComponent]
})
export class SharedModule {}
