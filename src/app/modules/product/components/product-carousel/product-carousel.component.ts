import { Component, OnInit, Input } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import {
  Observable,
  Subject,
  catchError,
  of,

} from 'rxjs';

import { Product } from 'src/app/modules/product/interfaces/product-interface';
import { ProductService } from 'src/app/modules/product/services/product.service';
import { ImageService } from 'src/app/modules/shared/services/image.service';
import { HttpParams } from '@angular/common/http';
import { PagedResponse } from 'src/app/modules/shared/interfaces/wrappers/paged-response-interface';

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
  products$?: Observable<PagedResponse<Product[]>>;
  error$ = new Subject<boolean>();
  imagesProviderUrl?: string;
  queryParams: HttpParams = new HttpParams();

  @Input() productSorting: string = '';
  @Input() productCardRoute: string = '/product/detail/';

  constructor(
    private productService: ProductService,
    private imageService: ImageService
  ) {
    this.imagesProviderUrl = this.imageService.getImagesProviderUrl();
  }

  ngOnInit(): void {
    this.loadQueryParams();
  }

  loadQueryParams() {
    this.queryParams = new HttpParams({
      fromObject: { sort: [this.productSorting] },
    });

    this.filterProducts(this.queryParams);
  }

  filterProducts(params: HttpParams) {
    this.products$ = this.productService.filterProductsByParams(params).pipe(
      catchError((error) => {
        console.error(error);
        this.error$.next(true);
        return of();
      }),
    );
  }
}
