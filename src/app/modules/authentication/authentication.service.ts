import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { environment } from '../../../environments/environment';
import { Subject } from 'rxjs';
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
  private userEmail: string;
  private authStatusListener = new Subject<boolean>();

  constructor(
    private http: HttpClient,
    private router: Router,
    private notificationService: NotificationService,
    private cookieService: CookieService,
    private userService: UserService
  ) {}

  getToken() {
    return localStorage.getItem('token');
  }

  getIsAuth() {
    return (localStorage.hasOwnProperty('token')) ? true : false;
  }

  getUserId() {
    return localStorage.getItem('userId');
  }

  getUserEmail() {
    return localStorage.getItem('userEmail');
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  createUser(FirstName: string, LastName: string, Email: string, Password: string) {
    const authRegister: Register = {
      firstname: FirstName,
      lastname: LastName,
      email: Email,
      password: Password
    };

    this.http.post<{message: string, userId: string}>(BACKEND_URL + '/register', authRegister).subscribe((res) => {
      this.notificationService.success(res.message);
      this.login(Email, Password, false);
    }, error => {
      this.authStatusListener.next(false);
    });
  }

  login(Email: string, Password: string, Remember: boolean) {
    const authData: Login = {email: Email, password: Password, remember: Remember};
    this.http.post<{token: string, userEmail: string, userId: string}>(
      BACKEND_URL + '/login',
      authData
    )
    .subscribe(response => {

      const token = response.token;
      this.token = token;
      if (token) {

        this.userId = response.userId;
        this.userEmail = response.userEmail;

        this.authStatusListener.next(true);

        if (Remember) {
          this.cookieService.set('remember', (Remember) ? 'yes' : 'no' );
          this.cookieService.set('email', Email );
          this.cookieService.set('pass', Password );
        }

        this.saveAuthData(token, this.userId, this.userEmail);
        this.userService.get(response.userId).subscribe(userData => {
          if (userData.activated) {
            this.router.navigate(['/dashboard']);
          } else {
            this.router.navigate(['/not-activated']);
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
    this.userEmail = authInformation.userEmail;
    this.authStatusListener.next(true);
  }

  logout() {
    this.token = null;
    this.userId = null;
    this.userEmail = null;
    this.authStatusListener.next(false);
    this.clearAuthData();
    this.router.navigate(['/auth/login']);
  }

  private saveAuthData(token: string, userId: string, userEmail: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
    localStorage.setItem('userEmail', userEmail);
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userEmail');
  }

  private getAuthData() {
    const authToken = localStorage.getItem('token');
    const authUserId = localStorage.getItem('userId');
    const authUserEmail = localStorage.getItem('userEmail');
    return {
      token: authToken,
      userId: authUserId,
      userEmail: authUserEmail
    };
  }
}
