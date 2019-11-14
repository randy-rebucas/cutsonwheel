import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Classification } from './classification';

import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
const BACKEND_URL = environment.apiUrl + '/classification';

@Injectable({
  providedIn: 'root'
})
export class ClassificationService {
  private classifications: Classification[] = [];
  private classificationsUpdated = new Subject<{ classifications: Classification[], counts: number }>();

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  getAll(perPage: number, currentPage: number) {
    const queryParams = `?pagesize=${perPage}&page=${currentPage}`;
    this.http.get<{message: string, classifications: any, counts: number }>(
      BACKEND_URL + queryParams
    )
    .pipe(
      map(classificationData => {
        return { classifications: classificationData.classifications.map(classification => {
          return {
            id: classification._id,
            name: classification.name,
            slug: classification.slug,
            description: classification.description,
            services: classification.services,
            image: classification.image
          };
        }), max: classificationData.counts};
      })
    )
    .subscribe((transformData) => {
      this.classifications = transformData.classifications;
      this.classificationsUpdated.next({
        classifications: [...this.classifications],
        counts: transformData.max
      });
    });
  }

  getUpdateListener() {
    return this.classificationsUpdated.asObservable();
  }

  getOne(classificationId: string) {
    return this.http.get<Classification>(BACKEND_URL + '/' + classificationId);
  }

  create(classificationData: any) {
    this.http
      .post<{ message: string }>(BACKEND_URL, classificationData)
      .subscribe((responseData) => {
        this.router.navigate(['/classification']);
      });
  }

  update(classificationData: any) {
    this.http.put<{ message: string, classification: Classification }>(BACKEND_URL + '/' + classificationData._id, classificationData)
    .subscribe((responseData) => {
      this.router.navigate(['/classification']);
    });

  }

  delete(classificationId: []) {
    return this.http.delete<{ message: string, classification: Classification }>(BACKEND_URL + '/' + classificationId);
  }

  upload(classificationId: string, image: File | string) {

    const uploadData = new FormData();
    uploadData.append('classificationId', classificationId);
    uploadData.append('image', image, classificationId);

    return this.http.post<{ message: string, image: string }>(BACKEND_URL + '/upload/' + classificationId, uploadData, {
      reportProgress: true,
      observe: 'events'
    });
  }
}
