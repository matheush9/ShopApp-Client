import { Observable, forkJoin, mergeMap, switchMap, tap } from 'rxjs';
import { Injectable } from '@angular/core';

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
  ) {
    if (this.jwtTokenService.getAuthenticatedUserId()) {
      this.setCurrentAccountInfo();
    }
  }

  register(user: User, storeDesc?: string): Observable<User> {
    return this.userService.addUser(user).pipe(
      switchMap(() => this.login(user)),
      tap(() => {
        if (storeDesc) 
          this.createStore(user, storeDesc).subscribe();
        this.createCustomer(user).subscribe();
        this.setCurrentAccountInfo();
      }));
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
        this.setCurrentAccountInfo();
      })
    );
  }

  logOut() {
    this.jwtTokenService.removeToken();
    this.removeCurrentAccountInfo();
  }

  private storeToken(token: string) {
    this.jwtTokenService.setToken(token);
  }

  userIsLogged(): boolean {
    return !!this.jwtTokenService.getToken();
  }

  setCurrentAccountInfo() {
    this.userService.setCurrentUser().subscribe((user) => {
      this.customerService.setCurrentCustomer(user);
      this.storeService.setCurrentStore(user);
    });
  }

  removeCurrentAccountInfo() {
    this.userService.removeCurrentUser();
    this.customerService.removeCurrentCustomer();
    this.storeService.removeCurrentStore();
  }
}
