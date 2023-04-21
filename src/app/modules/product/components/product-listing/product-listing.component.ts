import { Component, OnInit, Renderer2, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { Observable, Subject, catchError, of, tap } from 'rxjs';

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
  products: Product[] = [];
  images: Image[] = [];
  image$?: Observable<Image>;
  error$ = new Subject<boolean>();
  imagesProviderUrl?: string;
  queryParams: HttpParams = new HttpParams();

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
      this.filterProducts(this.queryParams);
    });
  }

  filterProducts(params: HttpParams) {
    this.products$ = this.productService.filterProductsByParams(params).pipe(
      catchError((error) => {
        console.error(error);
        this.error$.next(true);
        return of();
      }),
      tap((products) => {
        this.LoadProductsImage(products);
      })
    );
  }

  LoadProductsImage(products: Product[]) {
    this.products = products;
    this.queryParams = new HttpParams();
    this.products.forEach((element) => {
      this.queryParams = this.queryParams.append('proId', element.id);
    });
    this.getImagesByParams(this.queryParams);
  }

  getImagesByParams(params: HttpParams) {
    this.imageService
      .getImagesByProductParams(params)
      .pipe(
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

  changeProductOrdering(order: string) {
    this.router.navigate([], {
      queryParams: { sort: order },
      queryParamsHandling: 'merge',
    });
    this.loadQueryParams();
    console.log(order);
  }
}
