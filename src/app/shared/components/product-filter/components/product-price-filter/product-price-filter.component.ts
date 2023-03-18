import { Component } from '@angular/core';

@Component({
  selector: 'app-product-price-filter',
  templateUrl: './product-price-filter.component.html',
  styleUrls: ['./product-price-filter.component.scss']
})
export class ProductPriceFilterComponent {
  formatLabel(value: number): string {
    return '$' + value;
  }
}
