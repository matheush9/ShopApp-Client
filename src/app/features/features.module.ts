import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductListingComponent } from './components/product-listing/product-listing.component';
import { ProductFilterGroupComponent } from './components/product-filter-group/product-filter-group/product-filter-group.component';
import { SharedModule } from '../shared/shared.module';
import { StorePageComponent } from './components/store-page/store-page.component';
import { ProductAddComponent } from './components/product-add/product-add.component';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { CarouselModule } from 'ngx-owl-carousel-o';

@NgModule({
  declarations: [
    ProductDetailComponent,
    ProductListingComponent,
    ProductFilterGroupComponent,
    StorePageComponent,
    ProductAddComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatButtonModule,
    MatIconModule,
    CarouselModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule
  ],
  exports: [
    ProductListingComponent,
    ProductDetailComponent,
    StorePageComponent,
    ProductAddComponent,
  ],
})
export class FeaturesModule {}
