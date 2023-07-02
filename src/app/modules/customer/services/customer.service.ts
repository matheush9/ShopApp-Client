import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { JwtTokenService } from '../../shared/services/jwt-token.service';
import { environment } from 'src/environments/environment';
import { Customer } from '../interfaces/customer-interface';
import { User } from '../../user/interfaces/user-interface';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  currentCustomer?: Customer;

  constructor(
    private httpClient: HttpClient,
    private jwtTokenService: JwtTokenService,
  ) {}

  getCustomer(id: number): Observable<Customer> {
    return this.httpClient.get<Customer>(environment.apiUrl + '/Customer/' + id);
  }

  addCustomer(customer: Customer): Observable<Customer> {
    return this.httpClient.post<Customer>(environment.apiUrl + '/Customer', customer, {
      headers: this.jwtTokenService.getAuthHeader(),
    });
  }

  getCustomerByUserId(userId: number): Observable<Customer> {
    return this.httpClient.get<Customer>(
      environment.apiUrl + '/Customer/user/' + userId
    );
  }

  setCurrentCustomer(user: User) {
    if (user.customer) this.currentCustomer = user.customer;
    else this.getCustomerByUserId(user.id).subscribe((customer) => this.currentCustomer = customer);
  }

  removeCurrentCustomer() {
    delete this.currentCustomer;
  }
}
