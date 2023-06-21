import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';

import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import { OrderListingComponent } from './components/order-listing/order-listing.component';

import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [OrderDetailComponent, OrderListingComponent],
  imports: [
    CommonModule,
    OrderRoutingModule,
    MatTableModule,
    MatProgressSpinnerModule,
  ],
})
export class OrderModule {}
