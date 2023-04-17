import { Component, OnInit, Input } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import {
  Observable,
  Subject,
  catchError,
  of,
  switchMap,
  combineLatest,
  map,
  tap
} from 'rxjs';

import { Product } from 'src/app/modules/product/interfaces/product-interface';
import { Image } from '../../interfaces/image-interface';
import { ProductService } from 'src/app/modules/product/services/product.service';
import { ImageService } from '../../services/image.service';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-product-carousel',
  templateUrl: './product-carousel.component.html',
  styleUrls: ['./product-carousel.component.scss'],
})
export class ProductCarouselComponent implements OnInit {
  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    nav: false,
    pullDrag: true,
    dots: false,
    navSpeed: 600,
    lazyLoad: true,
    responsive: {
      0: {
        items: 1,
      },
      635: {
        items: 3,
      },
      1024: {
        items: 4,
      },
      1280: {
        items: 5,
      },
    },
  };

  products?: Product[];
  products$?: Observable<Product[]>;
  images: Image[] = [];
  image$?: Observable<Image>;
  error$ = new Subject<boolean>();
  imagesProviderUrl?: string;

  @Input() productSorting: string = '';
  @Input() productCardRoute: string = '/product/detail/';

  constructor(
    private productService: ProductService,
    private imageService: ImageService
  ) {
    this.imagesProviderUrl = this.imageService.getImagesProviderUrl();
  }

  ngOnInit(): void {
    this.products$ = this.productService
    .filterProductsByParams(
      new HttpParams({ fromObject: { sort: [this.productSorting] } })
    )
    .pipe(
      catchError((error) => {
        console.error(error);
        this.error$.next(true);
        return of([]);
      }),
      switchMap((products) =>
        combineLatest(
          products.map((product) => this.getImageByProduct(product.id))
        ).pipe(
          tap((images) => {
            this.images = images;
          }),
          map(() => products)
        )
      )
    );
  }

  getImageByProduct(productId: number): Observable<Image> {
    return this.imageService.getImageByProduct(productId).pipe(
      catchError((error) => {
        console.error(error);
        this.error$.next(true);
        return of();
      })
    );
  }
}
