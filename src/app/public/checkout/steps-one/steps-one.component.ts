import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'cowls-steps-one',
  templateUrl: './steps-one.component.html',
  styleUrls: ['./steps-one.component.css']
})
export class StepsOneComponent implements OnInit {

  public classificationId: string;

  constructor(
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.activatedRoute.parent.params.subscribe(
      (param) => {
        this.classificationId = param.classificationId;
      }
    );

  }

}
