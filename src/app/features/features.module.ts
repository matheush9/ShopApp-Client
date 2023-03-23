import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductListingComponent } from './components/product-listing/product-listing.component';
import { ProductFilterGroupComponent } from './components/product-filter-group/product-filter-group/product-filter-group.component';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { CarouselModule } from 'ngx-owl-carousel-o';

import { SharedModule } from '../shared/shared.module';


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
    MatIconModule,
    CarouselModule 
  ],
  exports: [
    ProductListingComponent,
    ProductDetailComponent
  ]
})
export class FeaturesModule { }
