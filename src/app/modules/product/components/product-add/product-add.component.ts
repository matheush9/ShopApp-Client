import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject, catchError, tap, map, of, finalize } from 'rxjs';

import { Product } from '../../interfaces/product-interface';
import { Image } from 'src/app/modules/shared/interfaces/image-interface';
import { ProductService } from '../../services/product.service';
import { ImageService } from 'src/app/modules/shared/services/image.service';

import { OwlOptions } from 'ngx-owl-carousel-o';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { ConfirmationDialogComponent } from 'src/app/modules/shared/components/confirmation-dialog/confirmation-dialog.component';

import { ProductCategory } from '../../interfaces/product-category-interface';
import { ProductCategoryService } from '../../services/product-category.service';
import { JwtTokenService } from 'src/app/modules/shared/services/jwt-token.service';
import { StoreService } from 'src/app/modules/store/services/store.service';
import { SnackbarService } from 'src/app/modules/shared/services/snackbar.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss'],
})
export class ProductAddComponent {
  @ViewChild('owlCar', { static: false }) owlCar?: any;

  newProduct: boolean = false;
  product$?: Observable<Product>;
  product: Product = {
    id: 0,
    name: '',
    description: '',
    price: 0,
    storeId: 0,
    productCategoryId: 0,
    images: [],
  };
  error$ = new Subject<boolean>();
  imagesProviderUrl: string;
  imageFileName: string = '';
  productCategories$?: Observable<ProductCategory[]>;
  isImageUploading: boolean = false;

  constructor(
    public dialog: MatDialog,
    private productService: ProductService,
    private imageService: ImageService,
    private route: ActivatedRoute,
    private productCategoryService: ProductCategoryService,
    private jwtTokenService: JwtTokenService,
    private storeService: StoreService,
    private snackbarService: SnackbarService
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
          if (id) {
            this.getProduct(Number(id));
          } else this.newProduct = true;
        })
      )
      .subscribe();

    this.getAllProductCategories();
    this.getUserStore();
  }

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

  removeImageDialog(dialogMessage: string): void {
    if (this.newProduct) {
      this.snackbarService.openSnackbar('Add your product first!');
      return;
    }

    this.openDialog(dialogMessage)
      .afterClosed()
      .subscribe((result) => {
        if (result)
          this.deleteImageById(
            this.product.images.at(this.owlCar.carouselService._current)!.id
          );
      });
  }

  cancelChangesDialog(dialogMessage: string): void {
    this.openDialog(dialogMessage)
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          // do something (later)
        }
      });
  }

  saveChangesDialog(dialogMessage: string): void {
    this.openDialog(dialogMessage)
      .afterClosed()
      .subscribe((result) => {
        if (result) this.saveProductInfo();
      });
  }

  deleteProductDialog(dialogMessage: string): void {
    this.openDialog(dialogMessage)
      .afterClosed()
      .subscribe((result) => {
        if (result) this.deleteProduct();
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
        this.getProduct(this.product!.id);
      });
  }

  uploadImage(event: any) {
    if (this.newProduct)
      return this.snackbarService.openSnackbar('Add your product first!');

    this.isImageUploading = true;
    const imageFile = event.target.files[0];
    
    this.imageService.uploadImage(imageFile, undefined, this.product.id).subscribe(() => {
      this.getProduct(this.product.id);
      this.isImageUploading = false;
    });
  }

  getAllProductCategories() {
    this.productCategories$ =
      this.productCategoryService.getAllProductCategories();
  }

  saveProductInfo() {
    if (this.newProduct)
      this.product$ = this.productService.addProduct(this.product).pipe(
        finalize(() => {
          window.location.href = 'product/inventory';
        })
      );
    else
      this.product$ = this.productService.updateProduct(
        this.product,
        this.product.id
      );
  }

  getUserStore() {
    const userId = this.jwtTokenService.getAuthenticatedUserId();
    this.storeService.getStoreByUser(userId).subscribe((store) => {
      this.product.storeId = store.id;
    });
  }

  deleteProduct() {
    this.product$ = this.productService.deleteProduct(this.product.id).pipe(
      finalize(() => {
        window.location.href = 'product/inventory';
      })
    );
  }
}
