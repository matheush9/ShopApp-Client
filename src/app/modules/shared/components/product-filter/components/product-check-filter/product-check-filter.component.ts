import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Observable } from 'rxjs';

import { ProductCategory } from './../../../../../product/interfaces/product-category-interface';
import { ProductCategoryService } from 'src/app/modules/product/services/product-category.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-check-filter',
  templateUrl: './product-check-filter.component.html',
  styleUrls: ['./product-check-filter.component.scss'],
})
export class ProductCheckFilterComponent {
  @Input() titleName: string = 'Title';
  @Output() checkBoxChange = new EventEmitter<string>();

  productCategories$?: Observable<ProductCategory[]>;
  productCategoryChecked: number = 0;

  constructor(
    private productCategoryService: ProductCategoryService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getAllProductCategories();
    this.getCategoryByParams();
  }

  getAllProductCategories() {
    this.productCategories$ =
      this.productCategoryService.getAllProductCategories();
  }

  onCheckBoxChange(event: any, categoryId: number) {
    if (event.checked)
      this.productCategoryChecked = categoryId;
    else 
      this.productCategoryChecked = 0;

    this.emitCheckedCategory();
  }

  emitCheckedCategory() {
    this.checkBoxChange.emit(String(this.productCategoryChecked));
  }

  getCategoryByParams() {
    this.route.queryParamMap.subscribe((params) => {
      const categoryId = params.get('categoryId');
      if (categoryId) this.productCategoryChecked = Number(categoryId);
    });
  }
}
