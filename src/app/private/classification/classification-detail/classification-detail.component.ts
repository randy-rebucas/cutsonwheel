import { Component, OnInit, OnDestroy } from '@angular/core';
import { ClassificationService } from '../classification.service';
import { ParamMap, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'cowls-classification-detail',
  templateUrl: './classification-detail.component.html',
  styleUrls: ['./classification-detail.component.css']
})
export class ClassificationDetailComponent implements OnInit, OnDestroy {
  public isLoading: boolean;
  public classificationId: string;
  public classificationName: string;
  public classificationDescription: string;
  public classificationImage: any;
  public classificationServices: any;

  constructor(
    public route: ActivatedRoute,
    private classificationService: ClassificationService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
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

  ngOnDestroy() {

  }
}
