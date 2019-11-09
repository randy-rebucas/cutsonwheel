import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ClassificationService } from 'src/app/private/classification/classification.service';
import { BookNowService } from '../book-now.service';

@Component({
  selector: 'cowls-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
  public isLoading: boolean;
  public classificationId: string;
  public classificationName: string;
  public classificationDescription: string;
  public classificationImage: any;
  public classificationServices: any;
  displayedColumns: string[] = ['type', 'duration', 'price'];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private booknowService: BookNowService,
    private classificationService: ClassificationService
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (param) => {
        this.classificationId = param.classificationId;
      }
    );

    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.classificationId = paramMap.get('classificationId');
      this.isLoading = true;
      this.classificationService.getOne(this.classificationId).subscribe(classificationData => {
        this.isLoading = false;
        this.classificationName = classificationData.name;
        this.classificationDescription = classificationData.description;
        this.classificationImage = classificationData.image;
        this.classificationServices = classificationData.services;
      });
    });
  }

  addToCart(service) {
    this.booknowService.addToCart(service);
  }

  onContinue() {
    this.router.navigate(['./4234254545456'], {relativeTo: this.activatedRoute});
  }
  /** Gets the total cost of all transactions. */
  getTotalCost() {
    return 0; // this.transactions.map(t => t.cost).reduce((acc, value) => acc + value, 0);
  }
}
