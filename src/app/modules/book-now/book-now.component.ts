import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { ClassificationService } from '../classification/classification.service';
import { Classification } from '../classification/classification';

@Component({
  selector: 'app-book-now',
  templateUrl: './book-now.component.html',
  styleUrls: ['./book-now.component.scss']
})
export class BookNowComponent implements OnInit, OnDestroy {

  total: number;
  perPage: number;
  currentPage: number;
  isLoading: boolean;
  classifications: any[];
  private classificationSub: Subscription;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private classificationService: ClassificationService
  ) {
    this.total = 0;
    this.perPage = 10;
    this.currentPage = 1;
    this.isLoading = false;
  }

  ngOnInit() {
    this.classificationService.getAll(this.perPage, this.currentPage);
    this.classificationSub = this.classificationService.getUpdateListener()
    .subscribe((classificationData: {classifications: Classification[], counts: number}) => {
      this.isLoading = false;
      this.total = classificationData.counts;
      this.classifications = classificationData.classifications;
    });
  }

  onDetail(classificationId: string) {
    this.router.navigate(['./' + classificationId], {relativeTo: this.activatedRoute});
  }

  ngOnDestroy() {
    this.classificationSub.unsubscribe();
  }
}
