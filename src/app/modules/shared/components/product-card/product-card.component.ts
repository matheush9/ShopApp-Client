import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {
  @Input() productName: string = '';
  @Input() productImageUrl: string = '/assets/svg/logo.svg';
  @Input() productId: number = 0;

  toStr(value: number): string {
    return value.toString();
  }
}
