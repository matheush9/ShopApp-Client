import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { ProductCategory } from '../interfaces/product-category-interface';

@Injectable({
  providedIn: 'root',
})
export class ProductCategoryService {
  constructor(private httpClient: HttpClient) {}

  getProductCategory(id: number): Observable<ProductCategory> {
    return this.httpClient.get<ProductCategory>(
      environment.apiUrl + '/ProductCategory/' + id
    );
  }

  getAllProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient.get<ProductCategory[]>(
      environment.apiUrl + '/ProductCategory'
    );
  }
}
