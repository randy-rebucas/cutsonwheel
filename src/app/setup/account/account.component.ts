import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { mimeType } from 'src/app/_validators/mime-type-validator';
import { UsersService } from 'src/app/users/users.service';
import { HttpEventType } from '@angular/common/http';
import { NotificationService } from 'src/app/_shared/notification.service';

@Component({
  selector: 'cowls-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  userId: string;
  profileForm: FormGroup;
  selectedFile: File = null;
  imagePreview: string;
  avatar: string;

  isLoadingPic = false;
  bufferValue: number;
  color: string;
  mode: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private usersService: UsersService,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.activatedRoute.parent.params.subscribe(
      (param) => {
        this.userId = param.userId;
      }
    );

    this.profileForm = new FormGroup({
      profilePicture: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      })
    });
  }

  onFileChanged(event: Event) {
    this.selectedFile = (event.target as HTMLInputElement).files[0];
    this.profileForm.patchValue({ profilePicture: this.selectedFile });
    this.isLoadingPic = true;
    this.onSavePicture();
  }

  onSavePicture() {
    this.usersService.upload(
      this.userId,
      this.profileForm.value.profilePicture
    ).subscribe((event) => {
      if (event.type === HttpEventType.UploadProgress) {
        this.bufferValue = Math.round(event.loaded / event.total * 100);
        this.color = 'primary';
        this.mode = 'determinate';
      } else if (event.type === HttpEventType.Response) {
        this.isLoadingPic = false;
        this.avatar = event.body.imagePath;
        this.notificationService.success(':: ' + event.body.message);
      }
    });
  }
}
