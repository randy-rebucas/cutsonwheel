import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  slideOpts: any;

  user: firebase.User;
  token: firebase.auth.IdTokenResult;
  private authSub: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.slideOpts = {
      initialSlide: 0,
      speed: 400
    };

    this.authSub = this.authService.getUserState()
      .subscribe( user => {
        if (user) {
          this.user = user;
        }
    });
  }

  ngOnDestroy() {
    this.authSub.unsubscribe();
  }
}
