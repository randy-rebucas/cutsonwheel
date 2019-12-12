import { Component, OnInit } from '@angular/core';
import { BookingsService } from './bookings.service';
import { Bookings } from './bookings';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit {
  loadedBookings: Bookings[];

  constructor(private bookingsService: BookingsService) { }

  ngOnInit() {
    this.loadedBookings = this.bookingsService.bookings;
  }

}
