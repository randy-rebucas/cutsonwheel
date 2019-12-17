import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ModalController, ActionSheetController, AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { MapModalComponent } from '../../map-modal/map-modal.component';
import { environment } from '../../../../environments/environment';
import { PlaceLocation, Coordinates } from '../../../places/location.model';
import { Plugins, Capacitor } from '@capacitor/core';


@Component({
  selector: 'app-location-picker',
  templateUrl: './location-picker.component.html',
  styleUrls: ['./location-picker.component.scss']
})
export class LocationPickerComponent implements OnInit {
  @Output() locationPick = new EventEmitter<PlaceLocation>();
  selectedLocationImage: string;
  isLoading = false;

  constructor(
    private modalCtrl: ModalController,
    private http: HttpClient,
    private actionSheetController: ActionSheetController,
    private alertController: AlertController
  ) {}

  ngOnInit() {}

  onPickLocation() {
    this.actionSheetController.create({
      header: 'Please Choose',
      buttons: [
        { text: 'Auto Locate', handler: () => {
          this.userLocation();
        } },
        { text: 'Pick a Map', handler: () => {
          this.openMap();
        } },
        { text: 'Cancel', role: 'cancel' }
      ]
    })
    .then(actionSheetEl => {
      actionSheetEl.present();
    });
  }

  private userLocation() {
    if (Capacitor.isPluginAvailable('Geolocation')) {
      this.errorMap();
      return;
    }

    Plugins.Geolocation.getCurrentPosition()
    .then(geoPosition => {
      const coordinates: Coordinates = {
        lat: geoPosition.coords.latitude,
        lng: geoPosition.coords.longitude
      };
      this.getLocation(coordinates.lat, coordinates.lng);
    })
    .catch(err => {
      this.errorMap();
    });
  }

  private errorMap() {
    this.alertController.create({
      header: 'Could not fetch location',
      message: 'Please use the map to pick a location',
      buttons: ['Okey']
    }).then(alertEl => alertEl.present());
  }

  private openMap() {
    this.modalCtrl.create({ component: MapModalComponent }).then(modalEl => {
      modalEl.onDidDismiss().then(modalData => {
        if (!modalData.data) {
          return;
        }
        const coordinates: Coordinates = {
          lat: modalData.data.lat,
          lng: modalData.data.lng
        };
        this.getLocation(coordinates.lat, coordinates.lng);
      });
      modalEl.present();
    });
  }

  private getLocation(latitude: number, longitude: number) {
    const pickedLocation: PlaceLocation = {
      lat: latitude,
      lng: longitude,
      address: null,
      staticMapImageUrl: null
    };
    this.isLoading = true;
    this.getAddress(latitude, longitude)
      .pipe(
        switchMap(address => {
          pickedLocation.address = address;
          return of(
            this.getMapImage(pickedLocation.lat, pickedLocation.lng, 14)
          );
        })
      )
      .subscribe(staticMapImageUrl => {
        pickedLocation.staticMapImageUrl = staticMapImageUrl;
        this.selectedLocationImage = staticMapImageUrl;
        this.isLoading = false;
        this.locationPick.emit(pickedLocation);
      });
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

  private getMapImage(lat: number, lng: number, zoom: number) {
    return `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=${zoom}&size=500x300&maptype=roadmap
    &markers=color:red%7Clabel:Place%7C${lat},${lng}
    &key=${environment.googleMapsApiKey}`;
  }
}
