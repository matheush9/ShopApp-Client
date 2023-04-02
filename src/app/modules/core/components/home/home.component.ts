import { Component } from '@angular/core';

import { ProductFilters } from 'src/app/modules/shared/models/product-filters-model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  readonly productFilter = ProductFilters;
}
