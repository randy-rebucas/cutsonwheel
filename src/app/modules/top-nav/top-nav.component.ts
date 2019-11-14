import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent {
  isAuth = true;

  @Input()
  isAuthenticated: boolean;

  @Output()
  logout = new EventEmitter<boolean>();

  onLogout() {
    // Output the value
    this.logout.emit(this.isAuth);
  }
}
