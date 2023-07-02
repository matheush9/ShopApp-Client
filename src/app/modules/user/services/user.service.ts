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

  constructor(
    private httpClient: HttpClient,
    private jwtTokenService: JwtTokenService
  ) {}

  getUser(id: number): Observable<User> {
    return this.httpClient.get<User>(environment.apiUrl + '/User/' + id);
  }

  addUser(newUser: User): Observable<User> {
    return this.httpClient.post<User>(environment.apiUrl + '/User', newUser);
  }

  authenticateUser(user: User): Observable<JwtToken> {
    return this.httpClient.post<JwtToken>(environment.apiUrl + '/User/auth', user);
  }

  editUser(id: number, newUser: User): Observable<User> {
    return this.httpClient.put<User>(environment.apiUrl + '/User/' + id, newUser, {
      headers: this.jwtTokenService.getAuthHeader(),
    });
  }

  deleteUser(id: number): Observable<User> {
    return this.httpClient.delete<User>(environment.apiUrl + '/User/' + id, {
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
