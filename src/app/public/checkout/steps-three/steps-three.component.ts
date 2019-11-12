import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'cowls-steps-three',
  templateUrl: './steps-three.component.html',
  styleUrls: ['./steps-three.component.css']
})
export class StepsThreeComponent implements OnInit {
  public userIsAuthenticated = false;

  constructor(
    public authService: AuthService
  ) { }

  ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuth();
  }

}
