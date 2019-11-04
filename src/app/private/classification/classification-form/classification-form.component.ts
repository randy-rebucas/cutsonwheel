import { Component, OnInit, OnDestroy } from '@angular/core';
import { ClassificationService } from '../classification.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cowls-classification-form',
  templateUrl: './classification-form.component.html',
  styleUrls: ['./classification-form.component.css']
})
export class ClassificationFormComponent implements OnInit, OnDestroy {
  isLoading = false;

  form: FormGroup;
  imagePreview: string;

  private classificationId: string;
  private authStatusSub: Subscription;
  private mode = 'create';

  constructor(
    public route: ActivatedRoute,
    private authService: AuthService,
    private classificationService: ClassificationService
  ) { }

  ngOnInit() {
    this.authStatusSub = this.authService
    .getAuthStatusListener()
    .subscribe(authStatus => {
      this.isLoading = false;
    });

    this.form = new FormGroup({
      name: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      description: new FormControl(null, { validators: [Validators.required] })
    });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('classificationId')) {
        this.mode = 'edit';
        this.classificationId = paramMap.get('classificationId');
        this.isLoading = true;
        this.classificationService.getOne(this.classificationId).subscribe(classificationData => {
          this.isLoading = false;
          this.form.setValue({
            name: classificationData.name,
            description: classificationData.description
          });
        });
      } else {
        this.mode = 'create';
        this.classificationId = null;
      }
    });

  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    this.isLoading = true;

    const classificationData = {
      name: this.form.value.name,
      description: this.form.value.description
    };

    const updateId = {
      _id: this.classificationId
    };

    const updateClassification = { ...classificationData, ...updateId };

    if (this.mode === 'create') {
      this.classificationService.insert(classificationData);
    } else {
      this.classificationService.update(updateClassification);
    }
    this.form.reset();
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
