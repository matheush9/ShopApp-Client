import { Component, OnInit, Input } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Observable, Subject, catchError, of } from 'rxjs';

import { Product } from 'src/app/modules/product/interfaces/product-interface';
import { ProductService } from 'src/app/modules/product/services/product.service';

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
    dots: true,
    navSpeed: 600,
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

  product?: Product;
  products$?: Observable<Product[]>;
  error$ = new Subject<boolean>();

  @Input() productFilter: string = '';

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.products$ = this.productService.filterProducts(this.productFilter).pipe(
      catchError((error) => {
        console.error(error);
        this.error$.next(true);
        return of();
      })
    );
  }
}
