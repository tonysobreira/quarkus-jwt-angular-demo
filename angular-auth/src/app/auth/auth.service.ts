import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoginRequest, LoginResponse, UserInfo } from './models/auth.model';
import { jwtDecode } from 'jwt-decode';

const TOKEN_KEY = 'access_token';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private readonly API_URL = 'http://localhost:8080';

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.API_URL}/auth/login`, credentials).pipe(
      tap((response) => {
        this.saveToken(response.access_token);
      })
    );
  }

  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  private saveToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
  }

  getCurrentUser(): UserInfo | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      return jwtDecode<UserInfo>(token);
    } catch (e) {
      return null;
    }
  }

  hasRole(role: string): boolean {
    const user = this.getCurrentUser();
    const roles = user?.groups;
    // return user?.roles?.includes(role) ?? false;
    return roles?.includes(role) ?? false;
  }
}
