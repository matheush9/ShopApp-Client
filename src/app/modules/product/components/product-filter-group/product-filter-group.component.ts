import { HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-product-filter-group',
  templateUrl: './product-filter-group.component.html',
  styleUrls: ['./product-filter-group.component.scss'],
})
export class ProductFilterGroupComponent {
  queryParams: HttpParams = new HttpParams();
  priceRange: string = '';
  productCategory: number = 0;

  constructor(private route: ActivatedRoute, private router: Router) {}

  storePriceRange(event: any) {
    this.priceRange = event;
  }

  storeCategory(event: any) {
    this.productCategory = event;
  }

  applyFilters() {
    this.route.queryParams.pipe().subscribe(() => {  
      const queryParams: any = { priceRange: this.priceRange };

      if (this.productCategory == 0) 
        queryParams.categoryId = null;
      else 
        queryParams.categoryId = this.productCategory;

      this.router.navigate([], {
        queryParams,
        queryParamsHandling: 'merge',
      });
    });
  }
}
