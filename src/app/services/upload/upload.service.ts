import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpRequest,
  HttpEventType,
  HttpResponse,
} from '@angular/common/http';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';

import { map } from 'rxjs/operators';
import { Upload } from 'src/app/interfaces/upload';

const BACKEND_URL = environment.apiUrl + '/upload';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  private files: Upload[] = [];
  private filesUpdated = new Subject<{ files: Upload[], count: number }>();

  constructor(private http: HttpClient) {}

  getAll(perPage: number, currentPage: number, userId: string) {
    const queryParams = `?userId=${userId}&pagesize=${perPage}&page=${currentPage}`;
    this.http.get<{message: string, files: any, max: number }>(
      BACKEND_URL + queryParams
    )
    .pipe(
      map(fileData => {
        return { files: fileData.files.map(file => {
          return {
            id: file._id,
            src: file.src,
            thumb: file.thumb,
            name: file.name,
            type: file.type,
            created: file.created,
            userId: file.userId
          };
        }), max: fileData.max};
      })
    )
    .subscribe((transformData) => {
      this.files = transformData.files;
      this.filesUpdated.next({
        files: [...this.files],
        count: transformData.max
      });
    });
  }

  getUpdateListener() {
    return this.filesUpdated.asObservable();
  }

  getFile(fileId: string) {
    // tslint:disable-next-line:max-line-length
    return this.http.get<Upload>(
      BACKEND_URL + '/' + fileId
      );
  }

  upload(files: Set<File>, userId: string):
    { [key: string]: { progress: Observable<number> } } {

    // this will be the our resulting map
    const status: { [key: string]: { progress: Observable<number> } } = {};

    files.forEach(file => {
      // create a new multipart-form for every file
      const formData: FormData = new FormData();
      formData.append('file', file, file.name);
      formData.append('userId', userId);

      // create a http-post request and pass the form
      // tell it to report the upload progress
      const req = new HttpRequest('POST', BACKEND_URL, formData, {
        reportProgress: true
      });

      // create a new progress-subject for every file
      const progress = new Subject<number>();

      // send the http-request and subscribe for progress-updates
      this.http.request(req).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {

          // calculate the progress percentage
          const percentDone = Math.round(100 * event.loaded / event.total);

          // pass the percentage into the progress-stream
          progress.next(percentDone);
        } else if (event instanceof HttpResponse) {

          // Close the progress-stream if we get an answer form the API
          // The upload is complete
          progress.complete();
        }
      });

      // Save every progress-observable in a map of all observables
      status[file.name] = {
        progress: progress.asObservable()
      };
    });

    // return the map of progress.observables
    return status;
  }

  deleteFile(fileId: string) {
    return this.http.delete(BACKEND_URL + '/' + fileId);
  }
}
