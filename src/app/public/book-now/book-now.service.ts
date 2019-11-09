import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { environment } from '../../../environments/environment';
import { NotificationService } from '../../_shared/notification.service';
import { CookieService } from 'ngx-cookie-service';
import { ClassificationService } from 'src/app/private/classification/classification.service';
import { Subject } from 'rxjs';

const BACKEND_URL = environment.apiUrl + '/book';

@Injectable({
  providedIn: 'root'
})
export class BookNowService {
  private servicesUpdated = new Subject<{ services: any, total: number }>();
  services = [];

  constructor(
    private http: HttpClient,
    private router: Router,
    private notificationService: NotificationService,
    private cookieService: CookieService
  ) {}

  addToCart(service) {
    this.services.push(service);
    this.setItem();
  }

  setItem() {
    return sessionStorage.setItem('services', JSON.stringify(this.getItem()));
  }

  getItem() {
    return this.services;
  }

  getItems() {
    let subTotal = 0;
    const services =  JSON.parse(sessionStorage.getItem('services'));
    this.services.forEach(element => {
      subTotal += parseFloat(element.price);
    });
    this.servicesUpdated.next({
      services: [...services],
      total: subTotal
    });
  }

  getCartListener() {
    return this.servicesUpdated.asObservable();
  }

  clearCart() {
    return sessionStorage.removeItem('services');
  }

}
