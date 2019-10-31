import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'cowls-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  isLoading = false;
  private authStatusSub: Subscription;
  public userIsAuthenticated = false;
  private cookieValue = null;
  loginForm: FormGroup;

  constructor(
    public router: Router,
    public authService: AuthService,
    public titleService: Title,
    private cookieService: CookieService
  ) { }

  ngOnInit() {
    this.titleService.setTitle('Auth - Login');
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
    .getAuthStatusListener()
    .subscribe(authStatus => {
      this.isLoading = false;
    });

    this.loginForm = new FormGroup({
      email: new FormControl((this.cookieService.check('email')) ? this.cookieService.get('email') : null, {
        validators: [
          Validators.required,
          Validators.maxLength(50)
        ]
      }),
      password: new FormControl((this.cookieService.check('pass')) ? this.cookieService.get('pass') : null, {
        validators: [
          Validators.required,
          Validators.maxLength(12)
        ]
      }),
      remember: new FormControl((this.cookieService.check('remember')) ? this.cookieService.get('remember') : null)
    });

  }

  get email() { return this.loginForm.get('email'); }

  onLogin() {
    if (this.loginForm.invalid) {
      return;
    }
    this.isLoading = true;
    this.authService.login(this.loginForm.value.email, this.loginForm.value.password, this.loginForm.value.remember);
  }

  onSignup() {
    this.router.navigate(['/auth/register']);
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }

}
