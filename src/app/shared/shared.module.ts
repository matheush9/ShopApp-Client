import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InputComponent } from './components/input/input.component';
import { IconBoxComponent } from './components/icon-box/icon-box.component';
import { ProductCardComponent } from './components/product-card/product-card/product-card.component';
import { ProductCheckFilterComponent } from './components/product-filter/components/product-check-filter/product-check-filter.component';

import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';



@NgModule({
  declarations: [
    InputComponent,
    IconBoxComponent,
    ProductCardComponent,
    ProductCheckFilterComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatExpansionModule,
    MatCheckboxModule
  ],
  exports: [
    InputComponent,
    IconBoxComponent,
    ProductCardComponent,
    ProductCheckFilterComponent,
  ]
})
export class SharedModule { }
