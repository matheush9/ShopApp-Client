import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Observable,
  Subject,
  catchError,
  forkJoin,
  tap,
  of,
  switchMap,
} from 'rxjs';

import { Product } from '../../interfaces/product-interface';
import { Image } from 'src/app/modules/shared/interfaces/image-interface';
import { ProductService } from '../../services/product.service';
import { ImageService } from 'src/app/modules/shared/services/image.service';

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
  query: string | null | undefined;
  filter: string | null | undefined;
  imagesProviderUrl?: string;

  constructor(
    private renderer: Renderer2,
    private route: ActivatedRoute,
    private router: Router,
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
    this.route.paramMap
      .pipe(
        tap((params) => {
          this.query = params.get('query');
          this.filter = params.get('filter');
          if (this.query !== null) {
            this.searchProduct(this.query);
          } else if (this.filter !== null) {
            this.filterProduct(this.filter);
          }
        })
      )
      .subscribe();

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

  searchProduct(query: string) {
    this.products$ = this.productService.searchProduct(query).pipe();
  }

  filterProduct(filter: string) {
    this.products$ = this.productService.filterProducts(filter).pipe();
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
