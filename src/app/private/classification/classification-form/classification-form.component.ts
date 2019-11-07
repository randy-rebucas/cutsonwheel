import { Component, OnInit, OnDestroy } from '@angular/core';
import { ClassificationService } from '../classification.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { Subscription } from 'rxjs';
import { mimeType } from 'src/app/_validators/mime-type-validator';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'cowls-classification-form',
  templateUrl: './classification-form.component.html',
  styleUrls: ['./classification-form.component.css']
})
export class ClassificationFormComponent implements OnInit, OnDestroy {
  isLoading = false;
  imageForm: FormGroup;
  form: FormGroup;
  selectedFile: File = null;

  isLoadingPic = false;
  bufferValue: number;
  color: string;
  pmode: string;

  image: any;

  private classificationId: string;
  private authStatusSub: Subscription;
  private mode = 'create';

  constructor(
    public route: ActivatedRoute,
    private authService: AuthService,
    private classificationService: ClassificationService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.authStatusSub = this.authService
    .getAuthStatusListener()
    .subscribe(authStatus => {
      this.isLoading = false;
    });

    this.imageForm = new FormGroup({
      classificationImage: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      })
    });

    this.form = this.formBuilder.group({
      name: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      description: new FormControl(null, { validators: [Validators.required] }),
      services: this.formBuilder.array([this.addServiceGroup()])
    });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('classificationId')) {
        this.mode = 'edit';
        this.classificationId = paramMap.get('classificationId');
        this.isLoading = true;
        this.classificationService.getOne(this.classificationId).subscribe(classificationData => {
          this.isLoading = false;

          this.image = classificationData.image;

          this.form.patchValue({
            name: classificationData.name,
            description: classificationData.description
          });

          const serviceControl = this.form.controls.services as FormArray;
          const service = classificationData.services;
          for (let i = 1; i < service.length; i++) {
            serviceControl.push(this.addServiceGroup());
          }
          this.form.patchValue({services: service});
        });
      } else {
        this.mode = 'create';
        this.classificationId = null;
      }
    });

  }

  addServiceGroup() {
    return this.formBuilder.group({
      type: ['']
    });
  }

  addServices() {
    this.serviceArray.push(this.addServiceGroup());
  }

  removeServices(index) {
    this.serviceArray.removeAt(index);
    this.serviceArray.markAsDirty();
    this.serviceArray.markAsTouched();
  }

  get serviceArray() {
    return this.form.get('services') as FormArray;
  }

  onFileChanged(event: Event) {
    this.selectedFile = (event.target as HTMLInputElement).files[0];
    this.imageForm.patchValue({ classificationImage: this.selectedFile });
    this.isLoadingPic = true;
    this.onSavePicture();
  }

  onSavePicture() {
    this.classificationService.upload(
      this.classificationId,
      this.imageForm.value.classificationImage
    ).subscribe((event) => {
      if (event.type === HttpEventType.UploadProgress) {
        this.bufferValue = Math.round(event.loaded / event.total * 100);
        this.color = 'primary';
        this.pmode = 'determinate';
      } else if (event.type === HttpEventType.Response) {
        this.isLoadingPic = false;
        this.image = event.body.image;
      }
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    this.isLoading = true;
    const classificationData = {
      _id: this.classificationId ? this.classificationId : null,
      name: this.form.value.name,
      description: this.form.value.description,
      services: this.form.value.services
    };

    if (this.mode === 'create') {
      this.classificationService.create(classificationData);
    } else {
      this.classificationService.update(classificationData);
    }
    this.form.reset();
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
