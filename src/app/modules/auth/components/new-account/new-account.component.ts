import { Component, OnInit } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';

import { User } from '../../interfaces/user-interface';
import { Store } from 'src/app/modules/store/interfaces/store-interface';
import { Customer } from 'src/app/modules/customer/interfaces/customer-interface';

import { LoginService } from '../../services/login.service';
import { StoreService } from 'src/app/modules/store/services/store.service';
import { CustomerService } from 'src/app/modules/customer/services/customer.service';
import { JwtTokenService } from 'src/app/modules/shared/services/jwt-token.service';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.scss'],
})
export class NewAccountComponent {
  user: User = {
    id: 0,
    name: '',
    email: '',
    password: '',
    images: [],
  };

  accountType: string = 'customer';
  storeDescription: string = '';

  constructor(
    private loginService: LoginService,
    private storeService: StoreService,
    private customerService: CustomerService,
    private jwtTokenService: JwtTokenService
  ) {}

  register() {
    this.loginService.addUser(this.user).subscribe(() => {
      this.login();
    });
  }

  createStore(): Observable<Store> {
    const store = {
      name: this.user.name,
      userId: this.jwtTokenService.getAuthenticatedUserId(),
      description: this.storeDescription,
    } as Store;

    return this.storeService.addStore(store);
  }

  createCustomer(): Observable<Customer> {
    const customer = {
      name: this.user.name,
      userId: this.jwtTokenService.getAuthenticatedUserId(),
    } as Customer;

    return this.customerService.addCustomer(customer);
  }

  login() {
    this.loginService.authenticateUser(this.user).subscribe((tokenObj) => {
      this.storeToken(tokenObj.token);

      if (this.accountType === 'customer') {
        this.createCustomer().subscribe(() => {
          window.location.href = '';
        });
      } else {
        forkJoin([this.createCustomer(), this.createStore()]).subscribe(() => {
          window.location.href = '';
        });
      }
    });
  }

  storeToken(token: string) {
    this.jwtTokenService.setToken(token);
  }
}
