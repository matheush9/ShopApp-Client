import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Product } from '../interfaces/product-interface';
import { JwtTokenService } from './../../shared/services/jwt-token.service';
import { PagedResponse } from '../../shared/interfaces/wrappers/paged-response-interface';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(
    private httpClient: HttpClient,
    private jwtTokenService: JwtTokenService
  ) {}

  getProduct(id: number): Observable<Product> {
    return this.httpClient.get<Product>(environment.apiUrl + '/Product/' + id, {
      headers: this.jwtTokenService.getAuthHeader(),
    });
  }

  searchProduct(query: string): Observable<Product[]> {
    return this.httpClient.get<Product[]>(
      environment.apiUrl + '/Product/search/' + query, {headers: this.jwtTokenService.getAuthHeader()}
    );
  }

  filterProductsByParams(params: HttpParams): Observable<PagedResponse<Product[]>> {
    return this.httpClient.get<PagedResponse<Product[]>>(environment.apiUrl + '/Product/filter/', {
      params: params, headers: this.jwtTokenService.getAuthHeader(),
    });
  }

  filterProductsByIdList(params: HttpParams): Observable<Product[]> {
    return this.httpClient.get<Product[]>(environment.apiUrl + '/Product/idList', {
      params: params
    });
  }

  addProduct(newProduct: Product): Observable<Product> {
    return this.httpClient.post<Product>(environment.apiUrl + '/Product', newProduct, {
      headers: this.jwtTokenService.getAuthHeader(),
    })
  }

  updateProduct(newProduct: Product, id: number): Observable<Product> {
    return this.httpClient.put<Product>(environment.apiUrl + '/Product/' + id, newProduct, {
      headers: this.jwtTokenService.getAuthHeader(),
    })
  }

  deleteProduct(productId: number): Observable<Product> {
    return this.httpClient.delete<Product>(environment.apiUrl + '/Product/' + productId, {
      headers: this.jwtTokenService.getAuthHeader(),
    })
  }
}
