import { Component, OnInit, OnDestroy } from '@angular/core';
import { ClassificationService } from '../classification.service';
import { Subscription } from 'rxjs';
import { ClassificationData } from '../classification-data.model';

@Component({
  selector: 'cowls-classification-list',
  templateUrl: './classification-list.component.html',
  styleUrls: ['./classification-list.component.css']
})
export class ClassificationListComponent implements OnInit, OnDestroy {
  total = 0;
  perPage = 10;
  currentPage = 1;
  classifications: any;
  isLoading = false;
  private classificationSub: Subscription;

  constructor(
    public classificationService: ClassificationService
  ) { }

  ngOnInit() {

    this.classificationService.getAll(this.perPage, this.currentPage);
    this.classificationSub = this.classificationService.getUpdateListener()
    .subscribe((classificationData: {classifications: ClassificationData[], counts: number}) => {
      this.isLoading = false;
      this.total = classificationData.counts;
      this.classifications = classificationData.classifications;
    });

  }

  onDetail(id: string) {
    console.log(id);
  }

  ngOnDestroy() {
    this.classificationSub.unsubscribe();
  }
}
