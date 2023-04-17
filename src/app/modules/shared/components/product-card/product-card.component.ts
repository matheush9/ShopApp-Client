import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {
  @Input() productName: string = '';
  @Input() productImageUrl: string = '';
  @Input() productId: number = 0;
  @Input() productRoute: string = '';

  toStr(value: number): string {
    return value.toString();
  }
}
  