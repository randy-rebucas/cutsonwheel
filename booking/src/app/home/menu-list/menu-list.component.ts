import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { UsersService } from 'src/app/users/users.service';
import { OffersService } from 'src/app/services/offers/offers.service';
import { BookingsService } from 'src/app/bookings/bookings.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss'],
})
export class MenuListComponent implements OnInit, OnDestroy {
  user: firebase.User;
  userInfo: any;

  totalOffer: number;
  totalBooking: number;
  isOfferActive: boolean;

  authSub: Subscription;

  constructor(
    private authService: AuthService,
    private userService: UsersService,
    private offersService: OffersService,
    private bookingsService: BookingsService
  ) {
    this.totalOffer = 0;
    this.totalBooking = 0;
    this.isOfferActive = false;
   }

  ngOnInit() {
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
      
      if (this.user) {
        this.userInfo = { ...profile, ...this.user };
        // if (this.userInfo.roles.assistant) {
        //   this.isOfferActive = true;
        // }
        /** count offers */
        this.offersService.getSizeById(this.user.uid).subscribe((res) => {
          this.totalOffer = res.docs.length;
        });
        /** count bookings */
        this.bookingsService.getSizeById(this.user.uid).subscribe((res) => {
          this.totalBooking = res.docs.length;
        });
      }

    });
  }

  ngOnDestroy(): void {
    this.authSub.unsubscribe();
  }
}
