import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductListingComponent } from './components/product-listing/product-listing.component';

import { MatButtonModule } from '@angular/material/button';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ProductDetailComponent,
    ProductListingComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatButtonModule
  ],
  exports: [
    ProductListingComponent
  ]
})
export class FeaturesModule { }
