import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  Input
} from '@angular/core';
import {
  Plugins,
  Capacitor,
  CameraSource,
  CameraResultType
} from '@capacitor/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-image-picker',
  templateUrl: './image-picker.component.html',
  styleUrls: ['./image-picker.component.scss']
})
export class ImagePickerComponent implements OnInit {
  @ViewChild('filePicker', { static: false }) filePickerRef: ElementRef<HTMLInputElement>;
  @Output() imagePick = new EventEmitter<string | File>();
  @Input() showPreview;
  selectedImage: string;
  usePicker = false;

  constructor(private platform: Platform) {}

  ngOnInit() {
    // if ((this.platform.is('mobile') && !this.platform.is('hybrid')) || this.platform.is('desktop')) {
    //   this.usePicker = true;
    // }
    this.selectedImage = this.showPreview;
  }

  async onPickImage() {
    // if (!Capacitor.isPluginAvailable('Camera')) {
    //   return;
    // }
    const capturedImage = await Plugins.Camera.getPhoto({
      quality: 100,
      source: CameraSource.Prompt,
      resultType: CameraResultType.Base64
    });
    this.selectedImage = capturedImage.base64String;
    this.imagePick.emit(capturedImage.base64String);
    // Plugins.Camera.getPhoto({
    //   quality: 100,
    //   source: CameraSource.Prompt,
    //   resultType: CameraResultType.Base64
    // })
    // .then(image => {
    //   this.selectedImage = image.base64String;
    //   this.imagePick.emit(image.base64String);
    // })
    // .catch(error => {
    //   // if (this.usePicker) {
    //   //   this.filePickerRef.nativeElement.click();
    //   // }
    //   return false;
    // });
  }

  onFileChosen(event: Event) {
    const pickedFile = (event.target as HTMLInputElement).files[0];
    if (!pickedFile) {
      return;
    }
    const fr = new FileReader();
    fr.onload = () => {
      const dataUrl = fr.result.toString();
      this.selectedImage = dataUrl;
      this.imagePick.emit(pickedFile);
    };
    fr.readAsDataURL(pickedFile);
  }
}