import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'current_user';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private tokenSubject = new BehaviorSubject<string | null>(this.getToken());
  public token$: Observable<string | null> = this.tokenSubject.asObservable();

  getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(TOKEN_KEY);
    }
    return null;
  }

  setToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(TOKEN_KEY, token);
      this.tokenSubject.next(token);
    }
  }

  removeToken(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(TOKEN_KEY);
      this.tokenSubject.next(null);
    }
  }

  decodeToken(): any {
    const token = this.getToken();
    if (!token) return null;

    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  isTokenExpired(): boolean {
    const decoded = this.decodeToken();
    if (!decoded || !decoded.exp) return true;

    const expirationDate = new Date(0);
    expirationDate.setUTCSeconds(decoded.exp);

    return expirationDate < new Date();
  }

  getUserData(): any {
    if (typeof window !== 'undefined') {
      const userData = localStorage.getItem(USER_KEY);
      return userData ? JSON.parse(userData) : null;
    }
    return null;
  }

  setUserData(userData: any): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(USER_KEY, JSON.stringify(userData));
    }
  }

  removeUserData(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(USER_KEY);
    }
  }
}
