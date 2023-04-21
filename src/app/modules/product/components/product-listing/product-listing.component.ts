import { Component, OnInit, Renderer2, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import {
  Observable,
  Subject,
  catchError,
  forkJoin,
  of,
  switchMap,
  tap,
} from 'rxjs';

import { Product } from '../../interfaces/product-interface';
import { Image } from 'src/app/modules/shared/interfaces/image-interface';
import { ProductService } from '../../services/product.service';
import { ImageService } from 'src/app/modules/shared/services/image.service';
import { ProductOrdinations } from 'src/app/modules/shared/models/product-ordinations-model';

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

  readonly productOrdinations = ProductOrdinations;

  constructor(
    private renderer: Renderer2,
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private imageService: ImageService
  ) {
    this.imagesProviderUrl = this.imageService.getImagesProviderUrl();
  }

  ngOnInit(): void {
    this.loadQueryParams();
  }

  onMenuClick() {
    this.checked = !this.checked;

    if (this.checked) this.renderer.addClass(document.body, 'block-scroll');
    else this.renderer.removeClass(document.body, 'block-scroll');
  }

  loadQueryParams() {
    this.route.queryParams.pipe().subscribe((params) => {
      this.queryParams = new HttpParams({ fromObject: params });
      this.filterProduct(this.queryParams);
      this.LoadProductsImage();
    });
  }

  filterProduct(params: HttpParams) {
    this.products$ = this.productService.filterProductsByParams(params);
  }

  changeProductOrdering(order: string) {
    this.router.navigate([], {
      queryParams: { sort: order },
      queryParamsHandling: 'merge',
    });
    this.loadQueryParams();
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
