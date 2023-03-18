import { Component, Input } from '@angular/core';

import { categories } from './product-check-filter-data';

@Component({
  selector: 'app-product-check-filter',
  templateUrl: './product-check-filter.component.html',
  styleUrls: ['./product-check-filter.component.scss']
})
export class ProductCheckFilterComponent {
  readonly categories = categories;

  @Input() titleName: string = 'Title';
}
