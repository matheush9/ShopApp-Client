import { Component } from '@angular/core';

import { OwlOptions } from 'ngx-owl-carousel-o';
import {
  MatDialog,
  MatDialogRef,
  MatDialogConfig,
} from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/modules/shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss'],
})
export class ProductAddComponent {
  newProduct: boolean = false;

  constructor(public dialog: MatDialog) {}

  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    nav: false,
    pullDrag: true,
    dots: true,
    navSpeed: 600,
    responsive: {
      0: {
        items: 1,
      },
      650: {
        items: 2,
      },
    },
  };

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    dialogMessage: string,
  ): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;

    this.dialog.open(ConfirmationDialogComponent, {
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
