import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  slideOpts: any;

  constructor() {}

  ngOnInit() {
    this.slideOpts = {
      initialSlide: 1,
      speed: 400
    };
  }
}
