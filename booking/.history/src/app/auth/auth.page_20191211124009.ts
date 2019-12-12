import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  // @ViewChild(..., { static: false })
  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
  }

  onLogin() {
    this.authService.login();
    this.loadingController.create({
      keyboardClose: true,
      message: 'Loagging in...'
    }).then(loadingEl => {
      loadingEl.present();
      setTimeout(() => {
        loadingEl.dismiss();
        this.router.navigateByUrl('places/discover');
      }, 1500);
    });
  }

  onSubmit(form: NgForm) {
    console.log(form);
  }
}
