import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cowls-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {
  isLoading = false;
  private authStatusSub: Subscription;

  constructor(
    public router: Router,
    public authService: AuthService,
    public titleService: Title
  ) { }

  ngOnInit() {
    this.titleService.setTitle('Auth - Register');
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
      authStatus => {
        this.isLoading = false;
      }
    );
  }

  onSignup(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    const userObject = {

    };

    this.authService.createUser(form.value.firstname, form.value.lastname, form.value.email, form.value.password);
  }

  onLogin() {
    this.router.navigate(['/auth/login']);
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }

}
