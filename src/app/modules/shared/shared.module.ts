import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { InputComponent } from './components/input/input.component';
import { IconBoxComponent } from './components/icon-box/icon-box.component';
import { ProductPriceFilterComponent } from './components/product-filter/components/product-price-filter/product-price-filter.component';
import { ProductCheckFilterComponent } from './components/product-filter/components/product-check-filter/product-check-filter.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { QuantitySelectorComponent } from './components/quantity-selector/quantity-selector.component';
import { StoreCardComponent } from './components/store-card/store-card.component';

import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { CarouselModule } from 'ngx-owl-carousel-o';

@NgModule({
  declarations: [
    InputComponent,
    IconBoxComponent,
    ProductPriceFilterComponent,
    ProductCheckFilterComponent,
    ConfirmationDialogComponent,
    QuantitySelectorComponent,
    StoreCardComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatIconModule,
    MatSliderModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatButtonModule,
    CarouselModule,
    MatSnackBarModule,
    MatProgressSpinnerModule
  ],
  exports: [
    InputComponent,
    IconBoxComponent,
    ProductCheckFilterComponent,
    ProductPriceFilterComponent,
    QuantitySelectorComponent,
    StoreCardComponent,
  ],
})
export class SharedModule {}
