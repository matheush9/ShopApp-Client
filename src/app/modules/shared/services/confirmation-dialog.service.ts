import { Injectable } from '@angular/core';

import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../components/confirmation-dialog/confirmation-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class ConfirmationDialogService {
  constructor(private dialog: MatDialog) {}

  openDialog(
    dialogMessage: string,
    enterAnimationDuration: string = '250ms',
    exitAnimationDuration: string = '150ms'
  ): MatDialogRef<ConfirmationDialogComponent, any> {
    return this.dialog.open(ConfirmationDialogComponent, {
      width: '300px',
      enterAnimationDuration,
      exitAnimationDuration,
      disableClose: true,
      data: {
        message: dialogMessage,
      },
    });
  }
}
