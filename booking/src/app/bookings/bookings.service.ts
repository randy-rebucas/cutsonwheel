import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { take, tap, delay, switchMap, map } from 'rxjs/operators';


import { AuthService } from '../auth/auth.service';
import { Bookings } from './bookings';
import { HttpClient } from '@angular/common/http';

interface BookingData {
  bookedFrom: string;
  bookedTo: string;
  firstName: string;
  guestNumber: number;
  lastName: string;
  placeId: string;
  placeImage: string;
  placeTitle: string;
  userId: string;
}

@Injectable({ providedIn: 'root' })
export class BookingsService {
  private bookings$ = new BehaviorSubject<Bookings[]>([]);

  get bookings() {
    return this.bookings$.asObservable();
  }

  constructor(private authService: AuthService, private http: HttpClient) {}

  addBooking(
    placeId: string,
    placeTitle: string,
    placeImage: string,
    firstName: string,
    lastName: string,
    guestNumber: number,
    dateFrom: Date,
    dateTo: Date
  ) {
    let generatedId: string;
    const newBooking = new Bookings(
      Math.random().toString(),
      placeId,
      this.authService.userId,
      placeTitle,
      placeImage,
      firstName,
      lastName,
      guestNumber,
      dateFrom,
      dateTo
    );
    return this.http.post<{name: string}>('https://cutsonwheel-233209.firebaseio.com/bookings.json', { ...newBooking, id: null })
    .pipe(switchMap(resData => {
      generatedId = resData.name;
      return this.bookings;
    }),
    take(1),
    tap(bookings => {
      newBooking.id = generatedId;
      this.bookings$.next(bookings.concat(newBooking));
    }));
  }

  cancelBooking(bookingId: string) {
    return this.http.delete(`https://cutsonwheel-233209.firebaseio.com/bookings/${bookingId}.json`)
    .pipe(switchMap(() => {
      return this.bookings;
    }),
    take(1),
    tap(bookings => {
      this.bookings$.next(bookings.filter(b => b.id !== bookingId));
    }));
  }

  fetchBookings() {
    return this.http.get<{ [key: string]: BookingData }>(
      `https://cutsonwheel-233209.firebaseio.com/bookings.json?orderBy="userId"&equalTo="${this.authService.userId}"`
    ).pipe(
      map(bookingData => {
        const bookings = [];
        for (const key in bookingData) {
          if (bookingData.hasOwnProperty(key)) {
            bookings.push(
              new Bookings(
                key,
                bookingData[key].placeId,
                bookingData[key].userId,
                bookingData[key].placeTitle,
                bookingData[key].placeImage,
                bookingData[key].firstName,
                bookingData[key].lastName,
                bookingData[key].guestNumber,
                new Date(bookingData[key].bookedFrom),
                new Date(bookingData[key].bookedTo)
              )
            );
          }
        }
        return bookings;
      }),
      tap(bookings => {
        this.bookings$.next(bookings);
      })
    );
  }
}
