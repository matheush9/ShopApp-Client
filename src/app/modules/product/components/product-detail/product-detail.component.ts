import { Component } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Observable, Subject, catchError, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

import { ProductService } from '../../services/product.service';
import { ImageService } from 'src/app/modules/shared/services/image.service';
import { Product } from '../../interfaces/product-interface';
import { Image } from 'src/app/modules/shared/interfaces/image-interface';
import { CartProduct } from 'src/app/modules/core/interfaces/cart-product-interface';
import { CartService } from 'src/app/modules/core/services/cart.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent {
  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    nav: false,
    pullDrag: true,
    dots: true,
    navSpeed: 600,
    lazyLoad: true,
    responsive: {
      0: {
        items: 1,
      },
    },
  };

  product?: Product;
  product$?: Observable<Product>;
  images?: Image[];
  images$?: Observable<Image[]>;
  error$ = new Subject<boolean>();
  imagesProviderUrl?: string;

  constructor(
    private productService: ProductService,
    private imageService: ImageService,
    private route: ActivatedRoute,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.imagesProviderUrl = this.imageService.getImagesProviderUrl();

    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');
        this.getProduct(Number(id));
        this.getImagesByProduct(Number(id));
      },
    });
  }

  getProduct(productId: number) {
    this.product$ = this.productService.getProduct(productId).pipe(
      catchError((error) => {
        console.error(error);
        this.error$.next(true);
        return of();
      })
    );
  }

  getImagesByProduct(productId: number) {
    this.images$ = this.imageService.getImagesbyProduct(productId).pipe(
      catchError((error) => {
        console.error(error);
        this.error$.next(true);
        return of();
      })
    );
  }

  addProductToCart(productId: number) {
    const product: CartProduct = {
      id: productId,
      amount: 1,
    };

    this.cartService.addProduct(product);
  }
}
