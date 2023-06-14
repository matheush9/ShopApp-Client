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
  productCategoriesChecked: number[] = [];

  constructor(
    private productCategoryService: ProductCategoryService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getAllProductCategories();
    this.loadCheckboxCategoriesByParams();
  }

  getAllProductCategories() {
    this.productCategories$ =
      this.productCategoryService.getAllProductCategories();
  }

  onCheckBoxChange(event: any, categoryId: number) {
    const categoryIndex = this.productCategoriesChecked.findIndex(
      (c) => c === categoryId
    );

    if (event.checked) {
      this.productCategoriesChecked.push(categoryId);
    } else {
      this.productCategoriesChecked.splice(categoryIndex, 1);
    }

    this.emitCategories();
  }

  emitCategories() {
    this.checkBoxChange.emit(String(this.productCategoriesChecked));
  }

  loadCheckboxCategoriesByParams() {
    this.route.queryParamMap.subscribe((params) => {
      const categoriesId = params.get('CategoriesId')?.split(',');
      if (categoriesId)
        this.productCategoriesChecked = categoriesId.map((str) => Number(str));
    });
  }

  getCheckboxStatus(categoryId: number): boolean {
    for (const category of this.productCategoriesChecked) {
      if (category === categoryId) {
        return true;
      }
    }
    return false;
  }
}
