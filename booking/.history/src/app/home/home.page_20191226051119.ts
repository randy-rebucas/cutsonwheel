import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  slideOpts: any;

  user: firebase.User;

  constructor(private authServices: AuthService) {}

  ngOnInit() {
    this.slideOpts = {
      initialSlide: 1,
      speed: 400
    };

    this.authServices.getUserState()
      .subscribe( user => {
        this.user = user;
      });
  }
}
