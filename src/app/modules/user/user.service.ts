import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { User } from './user';

const BACKEND_URL = environment.apiUrl + '/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users: User[] = [];
  private usersUpdated = new Subject<{ users: User[], counts: number }>();

  constructor(
    private http: HttpClient
  ) {}

  getAll(userType: string, perPage: number, currentPage: number) {
    const queryParams = `?pagesize=${perPage}&page=${currentPage}`;
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

  get(userId: string) {
    return this.http.get<User>(BACKEND_URL + '/' + userId);
  }

  insert(newUser: any) {
    return this.http.post<{ message: string, user: User }>(BACKEND_URL, newUser);
  }

  update(updatedUser: any) {
    return this.http.put<{ message: string }>(BACKEND_URL + '/' + updatedUser.id, updatedUser);
  }

  delete(patientIds: []) {
    return this.http.delete<{ message: string }>(BACKEND_URL + '/' + patientIds);
  }

  upload(userId: string, image: File | string) {

    const uploadData = new FormData();
    uploadData.append('userId', userId);
    uploadData.append('image', image, userId);

    return this.http.post<{ message: string, avatar: string }>(BACKEND_URL + '/upload/' + userId, uploadData, {
      reportProgress: true,
      observe: 'events'
    });
  }

  getAllClassifiedUser(classificationId: string) {
    return this.http.get<{classifiedUsers: any, count: number}>(BACKEND_URL + '/classified-user/' + classificationId);
  }

  updateClassification(userId: string, classificationId: string) {
    const classification = {
      classification: classificationId
    };
    return this.http.put<{ message: string }>(BACKEND_URL + '/classification/' + userId, classification);
  }
}
