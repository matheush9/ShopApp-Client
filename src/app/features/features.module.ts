import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductListingComponent } from './components/product-listing/product-listing.component';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { SharedModule } from '../shared/shared.module';
import { ProductFilterGroupComponent } from './components/product-filter-group/product-filter-group/product-filter-group.component';

@NgModule({
  declarations: [
    ProductDetailComponent,
    ProductListingComponent,
    ProductFilterGroupComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [
    ProductListingComponent
  ]
})
export class FeaturesModule { }
