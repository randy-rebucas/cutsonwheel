import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'cowls-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  public userIsAuthenticated = false;

  constructor(
    public authService: AuthService
  ) { }

  ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuth();
  }

}
