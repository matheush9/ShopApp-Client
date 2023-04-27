import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtTokenService {
  private jwtKey = 'jwt';

  constructor() {}

  getToken(): string | null {
    return localStorage.getItem(this.jwtKey);
  }

  setToken(token: string): void {
    localStorage.setItem(this.jwtKey, token);
  }

  removeToken(): void {
    localStorage.removeItem(this.jwtKey);
  }
}