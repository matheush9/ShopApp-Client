import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject, catchError, tap, of } from 'rxjs';

import { Product } from '../../interfaces/product-interface';
import { Image } from 'src/app/modules/shared/interfaces/image-interface';
import { ProductService } from '../../services/product.service';
import { ImageService } from 'src/app/modules/shared/services/image.service';

import { OwlOptions } from 'ngx-owl-carousel-o';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { ConfirmationDialogComponent } from 'src/app/modules/shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss'],
})
export class ProductAddComponent {
  newProduct: boolean = false;
  product$?: Observable<Product>;
  product?: Product;
  images: Image[] = [];
  images$?: Observable<Image[]>;
  error$ = new Subject<boolean>();
  imagesProviderUrl: string;

  constructor(
    public dialog: MatDialog,
    private productService: ProductService,
    private imageService: ImageService,
    private route: ActivatedRoute
  ) {
    this.imagesProviderUrl = this.imageService.getImagesProviderUrl();
  }

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

  ngOnInit() {
    this.route.paramMap
      .pipe(
        tap((params) => {
          const id = params.get('id');
          console.log(id);
          this.getProduct(Number(id));
          this.getImagesByProduct(Number(id));
        })
      )
      .subscribe();
  }

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    dialogMessage: string
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

  getProduct(productId: number) {
    this.product$ = this.productService.getProduct(productId).pipe(
      catchError((error) => {
        console.error(error);
        this.error$.next(true);
        return of();
      }),
      tap((data) => (this.product = data))
    );
  }

  getImagesByProduct(productId: number) {
    this.images$ = this.imageService.getImagesbyProduct(productId).pipe(
      catchError((error) => {
        console.error(error);
        this.error$.next(true);
        return of();
      })
    );
  }
}
