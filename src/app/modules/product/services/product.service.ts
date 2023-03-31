import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Product } from '../interfaces/product-interface';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl: string | undefined;

  constructor(private httpClient: HttpClient) {
    this.apiUrl = environment.apiUrl;
  }

  getProduct(id: number): Observable<Product> {
    return this.httpClient.get<Product>(this.apiUrl + '/api/Product/' + id)
  }
}
