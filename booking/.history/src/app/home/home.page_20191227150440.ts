import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

import { Plugins, Capacitor } from '@capacitor/core';
import { PlaceLocation, Coordinates } from '../services/location';
import { AlertController } from '@ionic/angular';
import { switchMap, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { UsersService } from '../users/users.service';
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
    private router: Router,
    private alertCtrl: AlertController,
    private http: HttpClient,
    private userService: UsersService
  ) {}

  ngOnInit() {
    this.slideOpts = {
      initialSlide: 0,
      speed: 400
    };

    // this.authService.getUserState()
    //   .subscribe( user => {
    //     if (user) {
    //       this.router.navigateByUrl('/t/services/discover');
    //     }
    // });

    // this.authService.getIdToken()
    //   .subscribe((token) => {
    //     console.log(token);
    //   }
    // );
  }

}
