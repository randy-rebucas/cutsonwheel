import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { BookNow } from './book-now';
const BACKEND_URL = environment.apiUrl + '/book-now';

@Injectable({
  providedIn: 'root'
})
export class BookNowService {

  constructor(
    private http: HttpClient
  ) { }

  insert(newBooking: any) {
    return this.http.post<{ message: string, user: BookNow }>(BACKEND_URL, newBooking);
  }
}
