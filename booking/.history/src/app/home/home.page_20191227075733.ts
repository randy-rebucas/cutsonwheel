import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  slideOpts: any;

  user: firebase.User;
  token: firebase.auth.IdTokenResult;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.slideOpts = {
      initialSlide: 0,
      speed: 400
    };

    this.authService.getUserState()
      .subscribe( user => {
        if (user) {
          this.router.navigateByUrl('/t/places/discover');
        }
    });

    // this.authService.getIdToken()
    //   .subscribe((token) => {
    //     console.log(token);
    //   }
    // );
  }
}
