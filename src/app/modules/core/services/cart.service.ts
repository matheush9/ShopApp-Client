import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';

import { CartProduct } from '../interfaces/cart-product-interface';
import { Item } from '../../order/interfaces/item-interface';

import { ItemService } from '../../order/services/item.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartKey = 'cart';
  private cartUpdateSubject = new Subject<CartProduct[]>();

  constructor(private itemService: ItemService) {}

  getCart(): CartProduct[] {
    let cart: CartProduct[] = [];
    const cartStr = localStorage.getItem(this.cartKey);
    if (cartStr != null) {
      cart = JSON.parse(cartStr);

      if (cartStr == '') {
        cart.push(JSON.parse(cartStr));
      }
      return cart;
    }
    return [];
  }

  addProduct(productId: number, quantity: number = 1) {
    let newCart = this.getCart();

    const cartProduct: CartProduct = {
      id: productId,
      quantity: quantity,
      totalPrice: 0,
    };

    const productIndex = newCart.findIndex((p) => p.id == cartProduct.id);
    if (productIndex !== -1) {
      newCart[productIndex].quantity++;
    } else {
      newCart.push(cartProduct);
    }
    localStorage.setItem(this.cartKey, JSON.stringify(newCart));
    this.cartUpdateSubject.next(newCart);
  }

  findProduct(productId: number): CartProduct | undefined {
    const productIndex = this.getCart().findIndex((p) => p.id === productId);
    return this.getCart().at(productIndex);
  }

  editProduct(cartProduct: CartProduct): CartProduct[] {
    let newCart = this.getCart();
    const productIndex = newCart.findIndex((p) => p.id === cartProduct.id);
    newCart[productIndex].quantity = cartProduct.quantity;
    newCart[productIndex].totalPrice = cartProduct.totalPrice;
    localStorage.setItem(this.cartKey, JSON.stringify(newCart));

    return newCart;
  }

  deleteProduct(productId: number): CartProduct[] {
    let newCart = this.getCart();
    const productIndex = newCart.findIndex((p) => p.id === productId);
    newCart.splice(productIndex, 1);
    localStorage.setItem(this.cartKey, JSON.stringify(newCart));

    this.cartUpdateSubject.next(newCart);

    return newCart;
  }

  cartUpdates(): Observable<CartProduct[]> {
    return this.cartUpdateSubject.asObservable();
  }

  addCartItemsToOrder(orderId: number): Observable<Item[]> {
    const cart = this.getCart();
    const itemList: Partial<Item>[] = cart.map((cartProduct) => ({
      orderId: orderId,
      productId: cartProduct.id,
      priceTotal: cartProduct.totalPrice,
      quantity: cartProduct.quantity,
    }));

    if (itemList.length > 0)
      return this.itemService.addItemsList(itemList as Item[]);
    else return throwError(() => new Error('Empty cart!'));
  }
}
