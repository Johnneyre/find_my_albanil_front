import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

import { Router } from '@angular/router';
import { LoginRequest, LoginResponse } from '../models/auth.model';
import { User } from '../models/user.model';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private tokenService = inject(TokenService);

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$: Observable<User | null> =
    this.currentUserSubject.asObservable();

  // TODO: Configurar la URL base del API desde environment
  private readonly API_URL = 'http://localhost:8080/api/auth';

  constructor() {
    // Cargar usuario desde localStorage si existe
    this.loadUserFromStorage();
  }

  private loadUserFromStorage(): void {
    const userData = this.tokenService.getUserData();
    if (userData && !this.tokenService.isTokenExpired()) {
      this.currentUserSubject.next(userData);
    }
  }

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.API_URL}/login`, credentials)
      .pipe(
        tap((response) => {
          // Guardar token
          this.tokenService.setToken(response.token);

          // Crear objeto user desde la respuesta
          const user: User = {
            id: response.id_user,
            nombreCompleto: response.nombre_completo,
            email: credentials.email,
          };

          // Guardar usuario
          this.tokenService.setUserData(user);
          this.currentUserSubject.next(user);
        })
      );
  }

  logout(): void {
    this.tokenService.removeToken();
    this.tokenService.removeUserData();
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    const token = this.tokenService.getToken();
    return !!token && !this.tokenService.isTokenExpired();
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  // Método para obtener datos actualizados del usuario desde el backend
  refreshUserData(): Observable<User> {
    return this.http.get<User>(`${this.API_URL}/me`).pipe(
      tap((user) => {
        this.tokenService.setUserData(user);
        this.currentUserSubject.next(user);
      })
    );
  }
}
