import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(public snackBar: MatSnackBar) { }

  config: MatSnackBarConfig = {
    duration: 3000,
    horizontalPosition: 'center',
    verticalPosition: 'top'
  };
  success(msg: any) {
      // this.config['panelClass']
      this.config.panelClass = ['notification', 'success'];
      this.snackBar.open(msg, '', this.config);
  }
  warn(msg: any) {
      // this.config['panelClass']
      this.config.panelClass = ['notification', 'warn'];
      this.snackBar.open(msg, '', this.config);
  }
}
