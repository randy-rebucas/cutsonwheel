import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { Title } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild('recaptcha', {static: true }) recaptchaElement: ElementRef;

  isLoading = false;
  phoneNumber: number;
  code: number;
  showCodeInput: boolean;

  constructor(
    public router: Router,
    public authenticationService: AuthenticationService,
    public titleService: Title,
    private cookieService: CookieService,
    private translate: TranslateService
  ) {
    translate.setDefaultLang('de'); // default language
    this.translate.use('en'); // override language

    this.showCodeInput = false;
   }

  ngOnInit() {
    this.titleService.setTitle('Login');
  }

  onVerify(val: number) {
    this.phoneNumber = val;
    this.isLoading = true;
    this.authenticationService.verify(this.phoneNumber)
    .subscribe((res) => {
      if (res.status === 'pending') {
        this.isLoading = false;
        this.showCodeInput = true;
      }
    });
  }

  onChecks(val: number) {

    this.authenticationService.check(this.phoneNumber, val);
  }

  onCancel() {
    this.showCodeInput = false;
  }

  onSignup() {
    this.router.navigate(['/auth/register']);
  }
}
