import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InputComponent } from './components/input/input.component';
import { IconBoxComponent } from './components/icon-box/icon-box.component';
import { ProductCardComponent } from './components/product-card/product-card/product-card.component';

import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    InputComponent,
    IconBoxComponent,
    ProductCardComponent
  ],
  imports: [
    CommonModule,
    MatIconModule
  ],
  exports: [
    InputComponent,
    IconBoxComponent,
    ProductCardComponent
  ]
})
export class SharedModule { }
