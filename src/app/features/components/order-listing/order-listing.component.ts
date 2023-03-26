import { Component } from '@angular/core';
import { OrderListing } from '../../interfaces/order-listing-interface';


//mock data

const order_data: OrderListing[] = [
  {id: 1, date: "01/01/2000", status: 'none', total: 2242.324},
  {id: 1, date: "01/01/2000", status: 'none', total: 2242.324},
  {id: 1, date: "01/01/2000", status: 'none', total: 2242.324},
  {id: 1, date: "01/01/2000", status: 'none', total: 2242.324},
  {id: 1, date: "01/01/2000", status: 'none', total: 2242.324},
];


@Component({
  selector: 'app-order-listing',
  templateUrl: './order-listing.component.html',
  styleUrls: ['./order-listing.component.scss']
})

export class OrderListingComponent {
  displayedColumns: string[] = ['id', 'date', 'status', 'total', 'order'];
  dataSource = order_data;
}
