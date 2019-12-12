import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userISAuthenticated = false;

  constructor() { }

  login() {
    this.userISAuthenticated = true;
  }

  logout() {
    this.userISAuthenticated = false;
  }
}
