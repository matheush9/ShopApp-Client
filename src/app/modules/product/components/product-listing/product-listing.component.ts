import { Component, OnInit, Renderer2, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject, catchError, forkJoin, of, switchMap, tap } from 'rxjs';

import { Product } from '../../interfaces/product-interface';
import { Image } from 'src/app/modules/shared/interfaces/image-interface';
import { ProductService } from '../../services/product.service';
import { ImageService } from 'src/app/modules/shared/services/image.service';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.scss'],
})
export class ProductListingComponent implements OnInit {
  checked: boolean = false;
  products$?: Observable<Product[]>;
  images: Image[] = [];
  image$?: Observable<Image>;
  error$ = new Subject<boolean>();
  imagesProviderUrl?: string;
  queryParams?: HttpParams;

  @Input() productCardRoute: string = '/product/detail/';

  constructor(
    private renderer: Renderer2,
    private route: ActivatedRoute,
    private productService: ProductService,
    private imageService: ImageService
  ) {
    this.imagesProviderUrl = this.imageService.getImagesProviderUrl();
  }

  onMenuClick() {
    this.checked = !this.checked;

    if (this.checked) this.renderer.addClass(document.body, 'block-scroll');
    else this.renderer.removeClass(document.body, 'block-scroll');
  }

  ngOnInit(): void {
    this.route.queryParams.pipe(
      tap((params) => {
        this.queryParams = new HttpParams({ fromObject: params });
        this.filterProduct(this.queryParams);
      })
    ).subscribe();

    this.LoadProductsImage();
  }      

  filterProduct(params: HttpParams) {
    this.products$ = this.productService.filterProductsByParams(params);
  }

  LoadProductsImage() {
    if (this.products$) {
      this.products$
        .pipe(
          switchMap((products) =>
            forkJoin(
              products.map((product) => this.getImageByProduct(product.id))
            )
          ),
          catchError((error) => {
            console.error(error);
            this.error$.next(true);
            return of();
          })
        )
        .subscribe((images) => {
          this.images = images;
        });
    }
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
