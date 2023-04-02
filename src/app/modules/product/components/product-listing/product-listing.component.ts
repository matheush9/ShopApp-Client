import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject, catchError, of } from 'rxjs';

import { ProductService } from '../../services/product.service';
import { Product } from '../../interfaces/product-interface';

@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.scss'],
})
export class ProductListingComponent implements OnInit {
  checked: boolean = false;
  products$?: Observable<Product[]>;
  error$ = new Subject<boolean>();
  query: string | null | undefined;

  constructor(
    private renderer: Renderer2,
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  onMenuClick() {
    this.checked = !this.checked;

    if (this.checked) this.renderer.addClass(document.body, 'block-scroll');
    else this.renderer.removeClass(document.body, 'block-scroll');
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        this.query = params.get('query');

        if (this.query !== null) this.searchProduct(this.query);
      },
    });
  }

  searchProduct(query: string) {
    this.products$ = this.productService.searchProduct(query).pipe(
      catchError((error) => {
        console.error(error);
        this.error$.next(true);
        return of();
      })
    );
  }
}
