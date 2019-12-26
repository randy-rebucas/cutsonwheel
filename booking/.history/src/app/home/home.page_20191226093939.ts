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
  token: firebase.auth.IdTokenResult;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.slideOpts = {
      initialSlide: 1,
      speed: 400
    };

    this.authService.getUserState()
      .subscribe( user => {
        this.user = user;
      });
    console.log(this.user);
    this.authService.getIdToken().subscribe((token) => {
      console.log(token);
    });
  }
}
