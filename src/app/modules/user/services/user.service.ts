import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';

import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user-interface';
import { JwtToken } from '../../shared/interfaces/jwt-token-interface';
import { JwtTokenService } from '../../shared/services/jwt-token.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  currentUser?: User;
  private apiUrl?: string;

  constructor(
    private httpClient: HttpClient,
    private jwtTokenService: JwtTokenService
  ) {
    this.apiUrl = environment.apiUrl;
  }

  getUser(id: number): Observable<User> {
    return this.httpClient.get<User>(this.apiUrl + '/User/' + id);
  }

  addUser(newUser: User): Observable<User> {
    return this.httpClient.post<User>(this.apiUrl + '/User', newUser);
  }

  authenticateUser(user: User): Observable<JwtToken> {
    return this.httpClient.post<JwtToken>(this.apiUrl + '/User/auth', user);
  }

  editUser(id: number, newUser: User): Observable<User> {
    return this.httpClient.put<User>(this.apiUrl + '/User/' + id, newUser, {
      headers: this.jwtTokenService.getAuthHeader(),
    });
  }

  deleteUser(id: number): Observable<User> {
    return this.httpClient.delete<User>(this.apiUrl + '/User/' + id, {
      headers: this.jwtTokenService.getAuthHeader(),
    });
  }

  setCurrentUser(refetch: boolean = false): Observable<User> {
    if (this.currentUser && !refetch) return of(this.currentUser);

    const userId = this.jwtTokenService.getAuthenticatedUserId();
    return this.getUser(userId).pipe(
      tap((user) => {
        this.currentUser = user;
      })
    );
  }

  removeCurrentUser() {
    delete this.currentUser;
  }
}
