import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
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
  form: FormGroup;
  selectedFile: File = null;
  avatar: string;

  isLoadingPic = false;
  bufferValue: number;
  color: string;
  mode: string;

  startDate = new Date(1990, 0, 1);
  currentDate = new Date();
  isLoadingContent = true;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private usersService: UsersService,
    private notificationService: NotificationService,
    private fb: FormBuilder
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

    this.form = this.fb.group({
      firstname: ['', [Validators.required]],
      midlename: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      age: ['', [Validators.required]],
      birthdate: ['', [Validators.required]],
      status: ['', [Validators.required]],
      contact: ['', [Validators.required]],
      // expertise: ['', [Validators.required]],
      sss: [null],
      tin: [null],
      philhealth: [null],
      addresses: this.fb.array([this.addAddressGroup()])
    });

    this.usersService.get(this.userId).subscribe(userData => {
      this.isLoadingContent = false;
      this.avatar = userData.avatar;
      this.form.patchValue({
        firstname: userData.firstname,
        midlename: userData.midlename,
        lastname: userData.lastname,
        gender: userData.gender,
        age: userData.age,
        birthdate: userData.birthdate,
        status: userData.status,
        contact: userData.contact,
        // expertise: userData.expertise,
        sss: userData.sss,
        tin: userData.tin,
        philhealth: userData.philhealth
      });
      const addressControl = this.form.controls.addresses as FormArray;
      const address = userData.address;
      for (let i = 1; i < address.length; i++) {
        addressControl.push(this.addAddressGroup());
      }
      this.form.patchValue({addresses: address});
    });
  }

  addAddressGroup() {
    return this.fb.group({
      address1: ['', [Validators.required]],
      address2: [''],
      city: ['', [Validators.required]],
      province: ['', [Validators.required]],
      postalCode: ['', [Validators.required]],
      country: ['', [Validators.required]]
    });
  }

  addAddress() {
    this.addressArray.push(this.addAddressGroup());
  }

  removeAddress(index) {
    this.addressArray.removeAt(index);
    this.addressArray.markAsDirty();
    this.addressArray.markAsTouched();
  }

  get addressArray() {
    return this.form.get('addresses') as FormArray;
  }

  onFileChanged(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.profileForm.patchValue({ profilePicture: file });
    this.profileForm.get('profilePicture').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.avatar = reader.result as string;
    };
    reader.readAsDataURL(file);
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
        this.avatar = event.body.avatar;
        this.notificationService.success(':: ' + event.body.message);
      }
    });
  }

  onUpdate() {
    const updatedUser = {
      id: this.userId,
      firstname: this.form.value.firstname,
      midlename: this.form.value.midlename,
      lastname: this.form.value.lastname,
      gender: this.form.value.gender,
      age: this.form.value.age,
      birthdate: this.form.value.birthdate,
      status: this.form.value.status,
      contact: this.form.value.contact,
      expertise: this.form.value.expertise,
      sss: this.form.value.sss,
      tin: this.form.value.tin,
      philhealth: this.form.value.philhealth,
      address: this.form.value.addresses
    };

    this.usersService.update(updatedUser).subscribe((response) => {
      this.notificationService.success(response.message);
      this.router.navigate(['../classifications'], {relativeTo: this.activatedRoute});
    });
  }

  onSkip(route: string) {
    this.router.navigate(['../' + route], {relativeTo: this.activatedRoute});
  }
}
