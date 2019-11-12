import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { environment } from '../../../environments/environment';
import { NotificationService } from '../notifcation/notification.service';
import { CookieService } from 'ngx-cookie-service';
import { UsersService } from '../users/users.service';
import { Register } from 'src/app/interfaces/register';
import { Login } from 'src/app/interfaces/login';

const BACKEND_URL = environment.apiUrl + '/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

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
    private usersService: UsersService
  ) {}

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return (localStorage.hasOwnProperty('token')) ? true : false;
  }

  getUserId() {
    return this.userId;
  }

  getUserEmail() {
    return this.userEmail;
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
      console.log(response);
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

        this.usersService.get(response.userId).subscribe(userData => {
          if (userData.activated) {
            this.router.navigate(['/dashboard']);
          } else {
            this.router.navigate(['/not-activated']);
            // this.router.navigate(['/setup/' + response.userId]);
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
