import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { environment } from '../../environments/environment';
import { NotificationService } from '../_shared/notification.service';
import { CookieService } from 'ngx-cookie-service';

const BACKEND_URL = environment.apiUrl + '/user';
@Injectable({ providedIn: 'root' })
export class SetupService {
  private isAuthenticated: boolean;
  private token: string;
  private userId: string;
  private userEmail: string;
  private authStatusListener = new Subject<boolean>();

  constructor(
    private http: HttpClient,
    private router: Router,
    private notificationService: NotificationService,
    private cookieService: CookieService
  ) {}

  updateUser(FirstName: string, LastName: string, Email: string, Password: string) {
    // const authRegister: RegisterData = {
    //   firstname: FirstName,
    //   lastname: LastName,
    //   email: Email,
    //   password: Password
    // };

    // this.http.post<{message: string, userId: string}>(BACKEND_URL + '/register', authRegister).subscribe((res) => {
    //   this.notificationService.success(res.message);
    //   this.router.navigate(['/setup/' + res.userId + '#profile']);
    // }, error => {
    //   this.authStatusListener.next(false);
    // });
  }


}
