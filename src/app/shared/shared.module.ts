import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InputComponent } from './components/input/input.component';
import { IconBoxComponent } from './components/icon-box/icon-box.component';
import { ProductCardComponent } from './components/product-card/product-card/product-card.component';
import { ProductPriceFilterComponent } from './components/product-filter/components/product-price-filter/product-price-filter.component';
import { ProductCheckFilterComponent } from './components/product-filter/components/product-check-filter/product-check-filter.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';

import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';




@NgModule({
  declarations: [
    InputComponent,
    IconBoxComponent,
    ProductCardComponent,
    ProductPriceFilterComponent,
    ProductCheckFilterComponent,
    ConfirmationDialogComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatSliderModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatButtonModule
  ],
  exports: [
    InputComponent,
    IconBoxComponent,
    ProductCardComponent,
    ProductCheckFilterComponent,
    ProductPriceFilterComponent
  ]
})
export class SharedModule { }
