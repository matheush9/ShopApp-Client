
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user-interface';
import { JwtToken } from './../../shared/interfaces/jwt-token-interface';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl?: string;

  constructor(private httpClient: HttpClient) {
    this.apiUrl = environment.apiUrl;
  }

  getUser(id: number): Observable<User> {
    return this.httpClient.get<User>(this.apiUrl + '/User/' + id);
  }

  addUser(newUser: User): Observable<JwtToken> {
    return this.httpClient.post<JwtToken>(this.apiUrl + '/User', newUser);
  }

  authenticateUser(user: User): Observable<JwtToken> {
    return this.httpClient.post<JwtToken>(this.apiUrl + '/User/auth', user);
  }
}
