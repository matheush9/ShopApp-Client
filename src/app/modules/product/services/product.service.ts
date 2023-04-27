import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Product } from '../interfaces/product-interface';
import { JwtTokenService } from './../../shared/services/jwt-token.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl?: string;

  constructor(
    private httpClient: HttpClient,
    private jwtTokenService: JwtTokenService
  ) {
    this.apiUrl = environment.apiUrl;
  }

  getProduct(id: number): Observable<Product> {
    return this.httpClient.get<Product>(this.apiUrl + '/Product/' + id, {
      headers: this.getAuthHeader(),
    });
  }

  searchProduct(query: string): Observable<Product[]> {
    return this.httpClient.get<Product[]>(
      this.apiUrl + '/Product/search/' + query, {headers: this.getAuthHeader()}
    );
  }

  filterProductsByParams(params: HttpParams): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.apiUrl + '/Product/filter/', {
      params: params, headers: this.getAuthHeader(),
    });
  }
  
  getAuthHeader() {
    return new HttpHeaders({
      Authorization: 'Bearer ' + this.jwtTokenService.getToken(),
    });
  }
}
