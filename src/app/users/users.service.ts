import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { UserData } from './user-data.model';

const BACKEND_URL = environment.apiUrl + '/user';

@Injectable({providedIn: 'root'})
export class UsersService {
  private users: UserData[] = [];
  private usersUpdated = new Subject<{ users: UserData[], counts: number }>();

  constructor(
    private http: HttpClient
  ) {}

  getAll(userType: string, perPage: number, currentPage: number) {
    const queryParams = `?usertype=${userType}&pagesize=${perPage}&page=${currentPage}`;
    this.http.get<{message: string, users: any, counts: number }>(
      BACKEND_URL + queryParams
    )
    .pipe(
      map(userData => {
        return { users: userData.users.map(user => {
          return {
            id: user._id,
            firstname: user.userId.personId.firstname,
            midlename: user.userId.personId.midlename,
            lastname: user.userId.personId.lastname,
            contact: user.userId.personId.contact,
            gender: user.userId.personId.gender,
            birthdate: user.userId.personId.birthdate,
            address: user.userId.personId.address,
            created: user.userId.personId.created,
            meta: user.userId.metaData,
            avatar: user.userId.avatarPath
          };
        }), max: userData.counts};
      })
    )
    .subscribe((transformData) => {
      this.users = transformData.users;
      this.usersUpdated.next({
        users: [...this.users],
        counts: transformData.max
      });
    });
  }

  getUpdateListener() {
    return this.usersUpdated.asObservable();
  }

  get(myUserId: string) {
    // tslint:disable-next-line: max-line-length
    return this.http.get<{ personId: string, firstname: any, midlename: any, lastname: string, contact: string, gender: string, birthdate: string, addresses: [], created: Date, email: string, userId: string, metas: [], avatar: string, userType: string, myuserId: string}>(
        BACKEND_URL + '/' + myUserId
      );
  }
  // tslint:disable-next-line:max-line-length
  insert(
    UserType: string,
    Firstname: string,
    Midlename: string,
    Lastname: string,
    Contact: string,
    Gender: string,
    Birthdate: string,
    Addresses: [],
    Meta: [],
    Email: string,
    Pass: string
  ) {
    const userData = {
      userType: UserType,
      firstname: Firstname,
      midlename: Midlename,
      lastname: Lastname,
      contact: Contact,
      gender: Gender,
      birthdate: Birthdate,
      address: Addresses,
      meta: Meta,
      email: Email,
      password: Pass
    };
    return this.http.post<{ message: string, user: UserData }>(BACKEND_URL, userData);
  }

  update(
    Id: string,
    UserType: string,
    Firstname: string,
    Midlename: string,
    Lastname: string,
    Contact: string,
    Gender: string,
    Birthdate: string,
    Addresses: [],
    Meta: []
  ) {
    const userData = {
      id: Id,
      userType: UserType,
      firstname: Firstname,
      midlename: Midlename,
      lastname: Lastname,
      contact: Contact,
      gender: Gender,
      birthdate: Birthdate,
      address: Addresses,
      meta: Meta
    };
    return this.http.put(BACKEND_URL + '/' + Id, userData);
  }

  delete(patientIds: []) {
    return this.http.delete<{ message: string }>(BACKEND_URL + '/' + patientIds);
  }

  upload(uId: string, image: File | string) {

    const uploadData = new FormData();
    uploadData.append('userId', uId);
    uploadData.append('profilePicture', image, uId);

    return this.http.post<{ message: string, imagePath: string }>(BACKEND_URL + '/upload/' + uId, uploadData, {
      reportProgress: true,
      observe: 'events'
    });
  }
}
