import { Component } from '@angular/core';
import { ProductListing } from 'src/app/modules/product/interfaces/product-listing-interface';

//mock data

const order_data: ProductListing[] = [
  {productName: 'abcde', price: 23.32, quantity: 3, total: 3242.324},
  {productName: 'abcde', price: 23.32, quantity: 3, total: 3242.324},
  {productName: 'abcde', price: 23.32, quantity: 3, total: 3242.324},
  {productName: 'abcde', price: 23.32, quantity: 3, total: 3242.324},
  {productName: 'abcde', price: 23.32, quantity: 3, total: 3242.324},
];


@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent {
  displayedColumns: string[] = ['Product', 'Price', 'Quantity', 'Total'];
  dataSource = order_data;
}
