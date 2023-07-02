import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Order } from './../interfaces/order-interface';
import { JwtTokenService } from '../../shared/services/jwt-token.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(
    private httpClient: HttpClient,
    private jwtTokenService: JwtTokenService
  ) {}

  getOrderById(id: number): Observable<Order> {
    return this.httpClient.get<Order>(environment.apiUrl + '/Order/' + id);
  }

  getOrdersByCustomerId(id: number): Observable<Order[]> {
    return this.httpClient.get<Order[]>(environment.apiUrl + '/Order/customer/' + id);
  }

  addOrder(order: Order): Observable<Order> {
    return this.httpClient.post<Order>(environment.apiUrl + '/Order', order, {
      headers: this.jwtTokenService.getAuthHeader(),
    });
  }

  addBlankOrder(customerId: number): Observable<Order> {
    const newOrder = {      
      customerId: customerId,
    } as Order;

    return this.addOrder(newOrder);
  }
}
