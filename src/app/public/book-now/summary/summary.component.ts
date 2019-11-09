import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookNowService } from '../book-now.service';
import { ClassificationService } from 'src/app/private/classification/classification.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cowls-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  total = 0;
  price: string;
  services: any;

  private servicesSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private booknowService: BookNowService,
    private classificationService: ClassificationService,
  ) { }

  ngOnInit() {
    this.servicesSub = this.booknowService.getCartListener()
    .subscribe((cartData: {services: any, total: number}) => {
      console.log(cartData);
      this.total = cartData.total;
      this.services = cartData.services;
    });
  }

}
