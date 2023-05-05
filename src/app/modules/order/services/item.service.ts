import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Item } from '../interfaces/item-interface';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private apiUrl?: string;

  constructor(private httpClient: HttpClient) {
    this.apiUrl = environment.apiUrl;
  }

  getItemsByOrderId(id: number): Observable<Item[]>{
    return this.httpClient.get<Item[]>(this.apiUrl + '/Item/order/' + id);
  }
}
