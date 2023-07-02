import { Component } from '@angular/core';

import { Observable } from 'rxjs';

import { Order } from '../../interfaces/order-interface';

import { OrderService } from '../../services/order.service';
import { CustomerService } from 'src/app/modules/customer/services/customer.service';

@Component({
  selector: 'app-order-listing',
  templateUrl: './order-listing.component.html',
  styleUrls: ['./order-listing.component.scss'],
})
export class OrderListingComponent {
  displayedColumns: string[] = ['id', 'date', 'status', 'order'];
  orders$?: Observable<Order[]>;

  constructor(
    private OrderService: OrderService,
    private customerService: CustomerService
  ) {}

  ngOnInit() {
    if (this.customerService.currentCustomer?.id)
      this.orders$ = this.OrderService.getOrdersByCustomerId(
        this.customerService.currentCustomer?.id
      );
  }
}
