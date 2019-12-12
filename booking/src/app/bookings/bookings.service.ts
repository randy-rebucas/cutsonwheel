import { Injectable } from '@angular/core';
import { Bookings } from './bookings';

@Injectable({
  providedIn: 'root'
})
export class BookingsService {
  private bookings$: Bookings[] = [
    {
      id: '01',
      placeId: 'p1',
      placeTitle: 'Manhattan Mansion',
      guestNumber: 2,
      userId: 'qwe'
    }
  ];

  get bookings() {
    return [...this.bookings$];
  }

  constructor() { }
}
