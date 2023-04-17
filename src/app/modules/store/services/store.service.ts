import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Store } from '../interfaces/store-interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private apiUrl?: string;

  constructor(private httpClient: HttpClient) {
    this.apiUrl = environment.apiUrl;
  }

  getStore(id: number): Observable<Store> {
    return this.httpClient.get<Store>(this.apiUrl + '/Store/' + id);
  }
}
