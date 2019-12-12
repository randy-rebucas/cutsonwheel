import { Component, OnInit } from '@angular/core';
import { BookingsService } from './bookings.service';
import { Bookings } from './bookings';
import { IonItemSliding } from '@ionic/angular';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit {
  bookings: Bookings[];

  constructor(private bookingsService: BookingsService) { }

  ngOnInit() {
    this.bookings = this.bookingsService.bookings;
  }

  onCancelBooking(offerId: string, slidingEl: IonItemSliding) {
    slidingEl.close();
    // cancel booking
  }
}
