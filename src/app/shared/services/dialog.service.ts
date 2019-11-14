import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { PromptDialogComponent } from 'src/app/modules/prompt-dialog/prompt-dialog.component';

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
