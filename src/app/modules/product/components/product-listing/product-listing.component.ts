import { Component, OnInit, Renderer2, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { PageEvent } from '@angular/material/paginator';
import { Observable, Subject, catchError, of, tap } from 'rxjs';

import { Product } from '../../interfaces/product-interface';
import { ImageService } from 'src/app/modules/shared/services/image.service';
import { ProductOrdinations } from 'src/app/modules/shared/models/product-ordinations-model';
import { PagedResponse } from 'src/app/modules/shared/interfaces/wrappers/paged-response-interface';

import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.scss'],
})
export class ProductListingComponent implements OnInit {
  checked: boolean = false;
  products$?: Observable<PagedResponse<Product[]>>;
  products: Product[] = [];
  error$ = new Subject<boolean>();
  imagesProviderUrl?: string;
  queryParams: HttpParams = new HttpParams();
  productsTotal = 1;
  pageSizeOptions: number[] = [5, 10, 15, 20];
  pageSize = 10;
  pageIndex = 1;
  productsTotalFound: number = 0;
  query: string = '';

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
      this.query = this.queryParams.get("query") ?? '';
      this.pageSize = Number(this.queryParams.get("pageSize")) || 10;
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
        this.productsTotal = products.totalRecords;
        this.productsTotalFound = products.data.length;
        this.pageIndex = products.pageNumber - 1;
      })
    );
  }

  changeProductOrdering(order: string) {
    this.router.navigate([], {
      queryParams: { sort: order },
      queryParamsHandling: 'merge',
    });
    this.loadQueryParams();
  }

  changeProductPage(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.router.navigate([], {      
      queryParams: { pageSize: event.pageSize, pageNumber: this.pageIndex + 1},
      queryParamsHandling: 'merge',
    });
    this.loadQueryParams();
  }
}
