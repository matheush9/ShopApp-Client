import { Component } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable, switchMap, tap } from 'rxjs';

import { Product } from 'src/app/modules/product/interfaces/product-interface';
import { CartProduct } from '../../interfaces/cart-product-interface';

import { ProductService } from 'src/app/modules/product/services/product.service';
import { ImageService } from 'src/app/modules/shared/services/image.service';
import { CartService } from '../../services/cart.service';
import { OrderService } from 'src/app/modules/order/services/order.service';
import { CustomerService } from 'src/app/modules/customer/services/customer.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  products$?: Observable<Product[]>;
  products: Product[] = [];
  imagesProviderUrl?: string;
  queryParams: HttpParams = new HttpParams();
  basePrice: number = 0;
  totalPrice: number = 0;
  discount: number = 0.0;
  cartItemsCount: number = 0;

  constructor(
    private productService: ProductService,
    private imageService: ImageService,
    private cartService: CartService,
    private orderService: OrderService,
    private customerService: CustomerService,
    private router: Router,
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
        this.products = products;
        this.calculateTotalPrice();
      })
    );
  }

  deleteProduct(productId: number) {
    this.cartService.deleteProduct(productId);
    this.loadQueryParams();
  }

  onProductQuantityChange(newQuantity: number, productId: number) {
    this.saveProductQuantityChange(productId, newQuantity);
    this.calculateTotalPrice();
  }

  calculateTotalPrice() {
    const cart = this.cartService.getCart();
    this.basePrice = 0;

    cart.forEach((cartProduct) => {
      const productIndex = this.products.findIndex(
        (p) => p.id === cartProduct.id
      );
      cartProduct.totalPrice =
        this.products[productIndex].price * cartProduct.quantity;
      this.cartService.editProduct(cartProduct);

      this.basePrice += cartProduct.totalPrice;
    });

    this.totalPrice = this.basePrice - this.discount;
  }

  saveProductQuantityChange(productId: number, newQuantity: number) {
    const cartProduct = {
      id: productId,
      quantity: newQuantity,
      totalPrice: 0,
    } as CartProduct;

    this.cartService.editProduct(cartProduct);
  }

  checkout() {
    if (this.customerService.currentCustomer) {
      this.orderService.addBlankOrder(this.customerService.currentCustomer.id)
        .pipe(
          switchMap((order) => this.cartService.addCartItemsToOrder(order.id))
        )
        .subscribe(() => {
          this.router.navigate(['order/listing']);
        });
    }
  }

  getProductQuantity(productId: number): number {
    return this.cartService.findProduct(productId)?.quantity ?? 1;
  }
}
