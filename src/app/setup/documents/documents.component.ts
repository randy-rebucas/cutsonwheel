import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { mimeType } from 'src/app/_validators/mime-type-validator';
import { forkJoin } from 'rxjs';
import { UploadService } from 'src/app/_shared/upload.service';

@Component({
  selector: 'cowls-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {
  @ViewChild('file', {static: false}) file;
  public files: Set<File> = new Set();

  progress;
  canBeClosed = false;
  primaryButtonText = 'Upload';
  uploading = false;
  uploadSuccessful = false;

  userId: string;
  documentForm: FormGroup;
  selectedFile: File = null;

  isLoadingPic = false;
  bufferValue: number;
  color: string;
  mode: string;

  isLoadingContent = true;
  perPage = 10;
  currentPage = 1;
  constructor(
    private activatedRoute: ActivatedRoute,
    private uploadService: UploadService,
    private router: Router
  ) { }

  ngOnInit() {
    this.activatedRoute.parent.params.subscribe(
      (param) => {
        this.userId = param.userId;
      }
    );

    this.documentForm = new FormGroup({
      nbiClearance: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      })
    });
  }

  addFiles() {
    this.file.nativeElement.click();
  }

  onFilesAdded() {
    const files: { [key: string]: File } = this.file.nativeElement.files;
    for (const key in files) {
      if (!isNaN(parseInt(key, 2))) {
        this.files.add(files[key]);
      }
    }
    this.canBeClosed  = true;
    // this.onFilesUploaded();
  }

  onFilesUploaded() {
    // set the component state to "uploading"
    this.uploading = true;

    // start the upload and save the progress map
    this.progress = this.uploadService.upload(this.files, this.userId);

    // convert the progress map into an array
    const allProgressObservables = [];
    // tslint:disable-next-line:forin
    for (const key in this.progress) {
      allProgressObservables.push(this.progress[key].progress);
    }

    // Adjust the state variables

    // The OK-button should have the text "Finish" now
    this.primaryButtonText = 'Finish';

    // When all progress-observables are completed...
    forkJoin(allProgressObservables).subscribe(end => {

      // ... the upload was successful...
      this.uploadSuccessful = true;

      // ... and the component is no longer uploading
      this.uploading = false;

      this.router.navigate(['../complete'], {relativeTo: this.activatedRoute});
    });
  }

  onSkip(route: string) {
    this.router.navigate(['../' + route], {relativeTo: this.activatedRoute});
  }
}
