import { Product } from '../../interfaces/product-interface';
import { Component, Input } from '@angular/core';
import { CartProduct } from 'src/app/modules/core/interfaces/cart-product-interface';

import { CartService } from 'src/app/modules/core/services/cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {
  @Input() product?: Product;
  @Input() productImageUrl: string = '';
  @Input() productRoute: string = '';

  constructor(private cartService: CartService) {}

  toStr(value: number): string {
    return value.toString();
  }

  addProductToCart(productId: number) {
    this.cartService.addProduct(productId);
  }
}
  