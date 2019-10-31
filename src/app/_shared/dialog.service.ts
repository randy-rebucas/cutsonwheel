import { PromptDialogComponent } from '../prompt-dialog/prompt-dialog.component';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  openConfirmDialog(msg) {
   return this.dialog.open(PromptDialogComponent, {
      width: '30%',
      panelClass: 'confirm-dialog-container',
      disableClose: true,
      data : {
        message : msg
      }
    });
  }
}
