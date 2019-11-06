import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/users/users.service';
import { NotificationService } from 'src/app/_shared/notification.service';
import { FormGroup, FormControl } from '@angular/forms';
import { ClassificationService } from 'src/app/private/classification/classification.service';
import { Subscription } from 'rxjs';
import { ClassificationData } from 'src/app/private/classification/classification-data.model';

@Component({
  selector: 'cowls-classification-option',
  templateUrl: './classification-option.component.html',
  styleUrls: ['./classification-option.component.css']
})
export class ClassificationOptionComponent implements OnInit, OnDestroy {
  userId: string;
  form: FormGroup;
  title = 'cutsonwheel';
  total = 0;
  perPage = 10;
  currentPage = 1;
  classifications: any;
  isLoading = false;
  isDisabled = true;
  isSelected = false;
  selectedClassification: string;
  public userIsAuthenticated = false;
  private classificationSub: Subscription;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private usersService: UsersService,
    private notificationService: NotificationService,
    public classificationService: ClassificationService
  ) { }

  ngOnInit() {
    this.activatedRoute.parent.params.subscribe(
      (param) => {
        this.userId = param.userId;
      }
    );

    this.form = new FormGroup({
      classification: new FormControl(null)
    });

    this.classificationService.getAll(this.perPage, this.currentPage);
    this.classificationSub = this.classificationService.getUpdateListener()
    .subscribe((classificationData: {classifications: ClassificationData[], counts: number}) => {
      this.isLoading = false;
      this.total = classificationData.counts;
      this.classifications = classificationData.classifications;
    });

    this.usersService.get(this.userId).subscribe(userData => {
      this.selectedClassification = userData.classification;
    });
  }

  onUpdate() {
    this.usersService.updateClassification(this.userId, this.form.value.classification).subscribe((response) => {
      this.notificationService.success(response.message);
      this.router.navigate(['../documents'], {relativeTo: this.activatedRoute});
    });
  }

  onSelect(Id: string) {
    this.form.patchValue({ classification: Id });
    this.isDisabled = false;
    this.isSelected = true;
  }

  onSkip(route: string) {
    this.router.navigate(['../' + route], {relativeTo: this.activatedRoute});
  }

  ngOnDestroy() {
    this.classificationSub.unsubscribe();
  }
}
