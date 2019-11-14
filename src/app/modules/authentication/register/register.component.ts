import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  isLoading: boolean;

  constructor(
    public router: Router,
    public authenticationService: AuthenticationService,
    public titleService: Title,
    private translate: TranslateService
  ) {
    this.translate.setDefaultLang('de'); // default language
    this.translate.use('en'); // override language
   }

  ngOnInit() {
    this.titleService.setTitle('Auth - Register');
    this.isLoading = false;
  }

  onSignup(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.authenticationService.createUser(form.value.firstname, form.value.lastname, form.value.email, form.value.password);
  }

  onLogin() {
    this.router.navigate(['/auth/login']);
  }
}
