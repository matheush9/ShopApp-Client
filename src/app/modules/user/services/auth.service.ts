import { Observable, forkJoin, switchMap, tap } from 'rxjs';
import { Injectable, ViewChild } from '@angular/core';

import { JwtTokenService } from '../../shared/services/jwt-token.service';
import { CustomerService } from '../../customer/services/customer.service';
import { UserService } from './user.service';
import { StoreService } from '../../store/services/store.service';

import { User } from '../interfaces/user-interface';
import { Store } from '../../store/interfaces/store-interface';
import { Customer } from '../../customer/interfaces/customer-interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private jwtTokenService: JwtTokenService,
    private userService: UserService,
    private customerService: CustomerService,
    private storeService: StoreService
  ) {}

  register(user: User, storeDesc?: string) {
    this.userService.addUser(user).pipe(
      switchMap(() => this.login(user)),
      switchMap(() => this.registerUserAndStore(user, storeDesc))
    ).subscribe();
  }
  
  private registerUserAndStore(user: User, storeDesc?: string): Observable<any> {
    const observables: Observable<any>[] = [];
  
    observables.push(this.createCustomer(user));
  
    if (storeDesc) 
      observables.push(this.createStore(user, storeDesc));
  
    return forkJoin(observables);
  }

  private createStore(user: User, storeDesc: string): Observable<Store> {
    const store = {
      name: user.name,
      userId: this.jwtTokenService.getAuthenticatedUserId(),
      description: storeDesc,
    } as Store;

    return this.storeService.addStore(store);
  }

  private createCustomer(user: User): Observable<Customer> {
    const customer = {
      name: user.name,
      userId: this.jwtTokenService.getAuthenticatedUserId(),
    } as Customer;

    return this.customerService.addCustomer(customer);
  }

  login(user: User): Observable<any> {
    return this.userService.authenticateUser(user).pipe(
      tap((tokenObj) => {
        this.storeToken(tokenObj.token);
        window.location.href = '';
      })
    );
  }

  logOut() {
    this.jwtTokenService.removeToken();
    window.location.href = 'user/login';
  }

  private storeToken(token: string) {
    this.jwtTokenService.setToken(token);
  }

  userIsLogged(): boolean {
    return !!this.jwtTokenService.getToken();
  }


}