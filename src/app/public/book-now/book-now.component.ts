import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ClassificationService } from 'src/app/private/classification/classification.service';
import { ClassificationData } from 'src/app/private/classification/classification-data.model';
import { fade } from 'src/app/animations';

@Component({
  selector: 'cowls-book-now',
  templateUrl: './book-now.component.html',
  styleUrls: ['./book-now.component.css'],
  animations: [
    fade
  ]
})
export class BookNowComponent implements OnInit, OnDestroy {
  total = 0;
  perPage = 10;
  currentPage = 1;
  classifications: any;
  isLoading = false;
  private classificationSub: Subscription;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
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

  onDetail(classificationId: string) {
    this.router.navigate(['./' + classificationId], {relativeTo: this.activatedRoute});
  }

  ngOnDestroy() {
    this.classificationSub.unsubscribe();
  }

}
