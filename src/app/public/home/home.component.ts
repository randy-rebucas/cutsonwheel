import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';
import { fade } from 'src/app/animations';


@Component({
  selector: 'cowls-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    fade
  ]
})
export class HomeComponent implements OnInit {
  title = 'cutsonwheel';
  public userIsAuthenticated = false;

  constructor(
    private router: Router,
    public authService: AuthService
  ) { }

  ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuth();
    if (this.userIsAuthenticated) {
      this.router.navigate(['/dashboard']);
    }
  }

}
