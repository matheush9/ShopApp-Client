import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreRoutingModule } from './store-routing.module';

import { StorePageComponent } from './components/store-detail/store-page.component';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [StorePageComponent],
  imports: [CommonModule, StoreRoutingModule, SharedModule],
})
export class StoreModule {}
