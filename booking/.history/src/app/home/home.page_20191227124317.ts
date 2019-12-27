import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

import { Plugins, Capacitor } from '@capacitor/core';
import { PlaceLocation, Coordinates } from '../services/location';
import { AlertController } from '@ionic/angular';
import { switchMap, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
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
  ) {}

  ngOnInit() {
    this.slideOpts = {
      initialSlide: 0,
      speed: 400
    };

    this.authService.getUserState()
      .subscribe( user => {
        if (user) {
          this.router.navigateByUrl('/t/services/discover');
        }
    });

    this.locateUser();
    // this.authService.getIdToken()
    //   .subscribe((token) => {
    //     console.log(token);
    //   }
    // );
  }

  private locateUser() {
    if (!Capacitor.isPluginAvailable('Geolocation')) {
      this.showErrorAlert();
      return;
    }
    Plugins.Geolocation.getCurrentPosition()
      .then(geoPosition => {
        const coordinates: Coordinates = {
          lat: geoPosition.coords.latitude,
          lng: geoPosition.coords.longitude
        };
        this.getAddress(coordinates.lat, coordinates.lng).subscribe(address => {
          console.log(address);
        });
      })
      .catch(err => {
        this.showErrorAlert();
      });
  }

  private showErrorAlert() {
    this.alertCtrl
      .create({
        header: 'Could not fetch location',
        message: 'Please use the map to pick a location!',
        buttons: ['Okay']
      })
      .then(alertEl => alertEl.present());
  }

  private getAddress(lat: number, lng: number) {
    return this.http
      .get<any>(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${
          environment.googleMapsApiKey
        }`
      )
      .pipe(
        map(geoData => {
          if (!geoData || !geoData.results || geoData.results.length === 0) {
            return null;
          }
          return geoData.results[0].formatted_address;
        })
      );
  }
}
