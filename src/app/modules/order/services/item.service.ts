import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Item } from '../interfaces/item-interface';
import { JwtTokenService } from '../../shared/services/jwt-token.service';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  constructor(
    private httpClient: HttpClient,
    private jwtTokenService: JwtTokenService
  ) {}

  getItemsByOrderId(id: number): Observable<Item[]> {
    return this.httpClient.get<Item[]>(environment.apiUrl + '/Item/order/' + id);
  }

  addItem(item: Item): Observable<Item> {
    return this.httpClient.post<Item>(environment.apiUrl + '/Item', item, {
      headers: this.jwtTokenService.getAuthHeader(),
    });
  }

  addItemsList(itemsList: Item[]): Observable<Item[]> {
    return this.httpClient.post<Item[]>(environment.apiUrl + '/Item/list', itemsList, {
      headers: this.jwtTokenService.getAuthHeader(),
    });
  }
}
