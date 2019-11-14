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
  public avatar: string;

  isLoadingPic: boolean;
  bufferValue: number;
  color: string;
  mode: string;

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
      firstname: ['', [Validators.required]],
      midlename: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      age: ['', [Validators.required]],
      birthdate: ['', [Validators.required]],
      status: ['', [Validators.required]],
      contact: ['', [Validators.required]],
      sss: [null],
      tin: [null],
      philhealth: [null],
      addresses: this.fb.array([this.addAddressGroup()])
    });

    this.userService.get(this.userId).subscribe(userData => {
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
    this.imageForm.patchValue({ profilePicture: file });
    this.imageForm.get('profilePicture').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.avatar = reader.result as string;
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

    this.userService.update(updatedUser).subscribe((response) => {
      this.notificationService.success(response.message);
      // this.router.navigate(['../classifications'], {relativeTo: this.activatedRoute});
    });
  }

  onSkip(route: string) {
    this.router.navigate(['../' + route], {relativeTo: this.activatedRoute});
  }
}
