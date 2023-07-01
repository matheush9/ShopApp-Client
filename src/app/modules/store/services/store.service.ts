import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

import { Store } from '../interfaces/store-interface';
import { environment } from 'src/environments/environment';
import { JwtTokenService } from '../../shared/services/jwt-token.service';
import { User } from '../../user/interfaces/user-interface';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private apiUrl?: string;
  private storeUpdateSubject = new Subject<Store | undefined>();
  currentStore?: Store;

  constructor(
    private httpClient: HttpClient,
    private jwtTokenService: JwtTokenService
  ) {
    this.apiUrl = environment.apiUrl;
  }

  getStore(id: number): Observable<Store> {
    return this.httpClient.get<Store>(this.apiUrl + '/Store/' + id);
  }

  getStoreByUser(userId: number): Observable<Store> {
    return this.httpClient.get<Store>(this.apiUrl + '/Store/user/' + userId);
  }

  addStore(store: Store): Observable<Store> {
    return this.httpClient.post<Store>(this.apiUrl + '/Store', store, {
      headers: this.jwtTokenService.getAuthHeader(),
    });
  }

  setCurrentStore(user: User) {
    const updateStore = (store: Store) => {
      this.currentStore = store;
      this.storeUpdateSubject.next(this.currentStore);
    };
  
    if (user.store) updateStore(user.store);
    else this.getStoreByUser(user.id).subscribe((store) => {updateStore(store)});
  }

  removeCurrentStore() {
    delete this.currentStore;
    this.storeUpdateSubject.next(this.currentStore);
  }

  storeUpdates(): Observable<Store | undefined> {
    return this.storeUpdateSubject.asObservable();
  }
}
