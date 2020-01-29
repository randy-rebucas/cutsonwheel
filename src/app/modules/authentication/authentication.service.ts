import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { environment } from '../../../environments/environment';
import { Subject, Observable } from 'rxjs';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../user/user.service';
import { Login, Register } from './authentication';

const BACKEND_URL = environment.apiUrl + '/auth';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private isAuthenticated: boolean;
  private token: string;
  private userId: string;
  private userPhone: string;
  private authStatusListener = new Subject<boolean>();
  private showCodeInput: boolean;

  constructor(
    private http: HttpClient,
    private router: Router,
    private notificationService: NotificationService,
    private cookieService: CookieService,
    private userService: UserService
  ) {
    this.showCodeInput = false;
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getIsAuth() {
    return (localStorage.hasOwnProperty('token')) ? true : false;
  }

  getUserId() {
    return localStorage.getItem('userId');
  }

  getUserPhone() {
    return localStorage.getItem('userPhone');
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  verify(phone: number) {
    return this.http.post<{status: string}>(
      BACKEND_URL + '/verify',
      {phoneNumber: phone}
    );
  }

  check(phone: number, accessCode: number) {
    this.http.post<{token: string, userPhone: string, userId: string}>(
      BACKEND_URL + '/check',
      {phoneNumber: phone, code: accessCode}
    ).subscribe(response => {

      const token = response.token;
      this.token = token;
      if (token) {

        this.userId = response.userId;
        this.userPhone = response.userPhone;

        this.authStatusListener.next(true);

        this.saveAuthData(token, this.userId, this.userPhone);

        this.userService.get(response.userId).subscribe(userData => {
          console.log(userData);
          if (userData.isSetupCompleted) {
            this.router.navigate(['/dashboard']);
          } else {
            this.router.navigate(['/get-started']);
          }
        });
      }
    }, error => {
      this.authStatusListener.next(false);
    });
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    this.token = authInformation.token;

    this.userId = authInformation.userId;
    this.userPhone = authInformation.userPhone;
    this.authStatusListener.next(true);
  }

  logout() {
    this.token = null;
    this.userId = null;
    this.userPhone = null;
    this.authStatusListener.next(false);
    this.clearAuthData();
    this.router.navigate(['/auth/login']);
  }

  private saveAuthData(token: string, userId: string, userPhone: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
    localStorage.setItem('userPhone', userPhone);
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userPhone');
  }

  private getAuthData() {
    const authToken = localStorage.getItem('token');
    const authUserId = localStorage.getItem('userId');
    const authUserPhone = localStorage.getItem('userPhone');
    return {
      token: authToken,
      userId: authUserId,
      userPhone: authUserPhone
    };
  }
}
