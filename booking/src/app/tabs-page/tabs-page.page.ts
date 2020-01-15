import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { UsersService } from '../users/users.service';
import { of, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Users } from '../users/users';

@Component({
  selector: 'app-tabs-page',
  templateUrl: './tabs-page.page.html',
  styleUrls: ['./tabs-page.page.scss'],
})
export class TabsPagePage implements OnInit, OnDestroy {
  user: firebase.User;
  users: Users;
  private authSub: Subscription;
  constructor(
    private authService: AuthService,
    private userService: UsersService
  ) { }

  ngOnInit() {
    // check current user state
    this.authSub = this.authService.getUserState().pipe(
      switchMap(user => {
        if (user) {
          this.user = user;
          return this.userService.getUser(user.uid);
        } else {
          return of(null);
        }
      })
    ).subscribe((profile) => {
      this.users = profile;
    });
  }

  ngOnDestroy() {
    this.authSub.unsubscribe();
  }
}
