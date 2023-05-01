import { Component } from '@angular/core';

import { Observable, tap } from 'rxjs';

import { Product } from 'src/app/modules/product/interfaces/product-interface';
import { Image } from 'src/app/modules/shared/interfaces/image-interface';
import { ProductService } from 'src/app/modules/product/services/product.service';
import { ImageService } from 'src/app/modules/shared/services/image.service';
import { CartService } from '../../services/cart.service';
import { CartProduct } from '../../interfaces/cart-product-interface';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  products$?: Observable<Product[]>;
  products: Product[] = [];
  images: Image[] = [];
  image$?: Observable<Image>;
  imagesProviderUrl?: string;
  queryParams: HttpParams = new HttpParams();
  basePrice: number = 0;
  totalPrice: number = 0;
  discount: number = 0.00;
  cartItemsCount: number = 0;

  constructor(
    private productService: ProductService,
    private imageService: ImageService,
    private cartService: CartService,
  ) {
    this.imagesProviderUrl = this.imageService.getImagesProviderUrl();
  }

  ngOnInit(): void {
    this.loadQueryParams();    
  }

  loadQueryParams() {
    this.queryParams = new HttpParams();
    const cart = this.cartService.getCart();
    this.cartItemsCount = cart.length;
    cart.forEach((productCart) => {
      this.queryParams = this.queryParams.append('proId', productCart.id);
    });

    this.filterProducts(this.queryParams);
  }

  filterProducts(params: HttpParams) {
    this.products$ = this.productService.filterProductsByIdList(params).pipe(
      tap((products) => {
        this.getImagesByParams(params);
        this.products = products;
        this.calculateTotalPrice();
      })
    );
  }

  getImagesByParams(params: HttpParams) {
    this.imageService.getImagesByProductParams(params).subscribe((images) => {
      this.images = images;
    });
  }

  deleteProduct(productId: number) {
    this.cartService.deleteProduct(productId);
    this.loadQueryParams();
  }

  calculateTotalPrice() {
    const cart = this.cartService.getCart();
    this.basePrice = 0;

    cart.forEach(cartProduct => {
      const productIndex = this.products.findIndex(p => p.id === cartProduct.id)
      this.basePrice += this.products[productIndex].price * cartProduct.amount;
    });      

    this.totalPrice = this.basePrice - this.discount;
  }
}
