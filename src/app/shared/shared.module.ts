import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './components/input/input.component';
import { IconBoxComponent } from './components/icon-box/icon-box.component';



@NgModule({
  declarations: [
    InputComponent,
    IconBoxComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    InputComponent,
    IconBoxComponent
  ]
})
export class SharedModule { }
