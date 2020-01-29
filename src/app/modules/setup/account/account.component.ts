import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { AuthenticationService } from '../../authentication/authentication.service';
import { UserService } from '../../user/user.service';
import { NotificationService } from './../../../shared/services/notification.service';
import { mime } from './../../../shared/validators/mime-validator';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  private userId: string;
  public imageForm: FormGroup;
  public form: FormGroup;
  private selectedFile: File = null;
  public photoUrl: string;

  isLoadingPic: boolean;
  bufferValue: number;
  color: string;
  mode: string;
  role: string;

  startDate = new Date(1990, 0, 1);
  currentDate = new Date();
  isLoadingContent: boolean;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private notificationService: NotificationService,
    private authenticationService: AuthenticationService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.userId = this.authenticationService.getUserId();
    this.isLoadingPic = false;
    this.isLoadingContent = true;

    this.imageForm = new FormGroup({
      profilePicture: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mime]
      })
    });

    this.form = this.fb.group({
      role: ['', [Validators.required]],
      firstname: ['', [Validators.required]],
      midlename: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      birthdate: ['', [Validators.required]],
      address1: ['', [Validators.required]],
      address2: [''],
      city: ['', [Validators.required]],
      province: ['', [Validators.required]],
      postalCode: ['', [Validators.required]],
      country: ['', [Validators.required]]
    });

    this.userService.get(this.userId).subscribe(userData => {
      this.isLoadingContent = false;
      console.log(userData);
      this.photoUrl = userData.photoUrl;
      if (userData.roles) {
        this.role = (userData.roles.assistant) ? 'assistant' : 'client';
      }
      this.form.patchValue({
        firstname: userData.name.firstname,
        midlename: userData.name.midlename,
        lastname: userData.name.lastname,
        gender: userData.gender,
        birthdate: userData.birthdate,
        address1: userData.address.address1,
        address2: userData.address.address2,
        province: userData.address.province,
        city: userData.address.city,
        country: userData.address.country,
        postalCode: userData.address.postalCode
      });
    });
  }

  onFileChanged(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.imageForm.patchValue({ profilePicture: file });
    this.imageForm.get('profilePicture').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.photoUrl = reader.result as string;
    };
    reader.readAsDataURL(file);
    this.onSavePicture();
  }

  onSavePicture() {
    this.userService.upload(
      this.userId,
      this.imageForm.value.profilePicture
    ).subscribe((event) => {
      if (event.type === HttpEventType.UploadProgress) {
        this.bufferValue = Math.round(event.loaded / event.total * 100);
        this.color = 'primary';
        this.mode = 'determinate';
      } else if (event.type === HttpEventType.Response) {
        this.isLoadingPic = false;
        this.photoUrl = event.body.avatar;
        this.notificationService.success(':: ' + event.body.message);
      }
    });
  }

  onUpdate() {
    const updatedUser = {
      _id: this.userId,
      name: {
        firstname: this.form.value.firstname,
        midlename: this.form.value.midlename,
        lastname: this.form.value.lastname
      },
      gender: this.form.value.gender,
      birthdate: this.form.value.birthdate,
      address: {
        address1: this.form.value.address1,
        address2: this.form.value.address2,
        province: this.form.value.province,
        city: this.form.value.city,
        country: this.form.value.country,
        postalCode: this.form.value.postalCode
      },
      isSetupCompleted: (this.form.value.role === 'client') ? true : false,
      roles: {
        client: (this.form.value.role === 'client') ? true : false,
        assistant: (this.form.value.role === 'assistant') ? true : false
      }
    };

    this.userService.update(updatedUser).subscribe((response) => {
      this.notificationService.success(response.message);
      this.router.navigateByUrl('dashboard');
    });
  }

}
