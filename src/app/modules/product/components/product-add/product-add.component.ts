import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject, catchError, tap, of } from 'rxjs';

import { Product } from '../../interfaces/product-interface';
import { Image } from 'src/app/modules/shared/interfaces/image-interface';
import { ProductService } from '../../services/product.service';
import { ImageService } from 'src/app/modules/shared/services/image.service';

import { OwlOptions } from 'ngx-owl-carousel-o';
import { MatDialog } from '@angular/material/dialog';

import { ConfirmationDialogComponent } from 'src/app/modules/shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss'],
})
export class ProductAddComponent {
  @ViewChild('owlCar', { static: false }) owlCar?: any;

  newProduct: boolean = false;
  product$?: Observable<Product>;
  product?: Product;
  images: Image[] = [];
  images$?: Observable<Image[]>;
  error$ = new Subject<boolean>();
  imagesProviderUrl: string;
  imageFileName: string = '';

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
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '300px',
      enterAnimationDuration,
      exitAnimationDuration,
      disableClose: true,
      data: {
        message: dialogMessage,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteImageById(
          this.images.at(this.owlCar.carouselService._current)!.id
        );
      }
    });
  }

  getProduct(productId: number) {
    this.product$ = this.productService.getProduct(productId).pipe(
      catchError((error) => {
        console.error(error);
        this.error$.next(true);
        return of();
      }),
      tap((product) => (this.product = product))
    );
  }

  getImagesByProduct(productId: number) {
    this.images$ = this.imageService.getImagesbyProduct(productId).pipe(
      catchError((error) => {
        console.error(error);
        this.error$.next(true);
        return of();
      }),
      tap((images) => {
        this.images = images;
      })
    );
  }

  deleteImageById(imageId: number) {
    this.imageService
      .deleteImageById(imageId)
      .pipe(
        catchError((error) => {
          console.error(error);
          this.error$.next(true);
          return of();
        })
      )
      .subscribe(() => {
        this.getImagesByProduct(this.product!.id);
      });
  }

  uploadImage(event: any) {
    const imageFile: File = event.target.files[0];
    if (imageFile) {
      this.imageFileName = '-product'+ imageFile.name;

      const formData = new FormData();
      var imageModel = {
        name: this.imageFileName,
        productId: this.product!.id,
      } as Image;

      formData.append('imageFile', imageFile, this.imageFileName);
      formData.append('json', JSON.stringify(imageModel));

      this.imageService.uploadImageFile(formData).subscribe(() => {
        this.getImagesByProduct(this.product!.id);
      });
    }
  }
}
