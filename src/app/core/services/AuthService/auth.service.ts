import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly tokenKey = 'auth_token';
  //TODO: crear archivo api-urls con constantes de urls
  // Mover URL base a archivo de configuración
  private apiUrl = 'http://localhost/MyPortfolio/api';

  constructor(private http: HttpClient) { }

  private isLocalStorageAvailable(): boolean {
    try {
      return typeof window !== 'undefined' && !!window.localStorage;
    } catch {
      return false;
    }
  }

  login(username: string, password: string) {
    return this.http.post<{ token: string }>(`${this.apiUrl}/Auth/login`, { username, password })
      .pipe(
        tap((res: { token: string }) => {
          if (this.isLocalStorageAvailable()) {
            localStorage.setItem(this.tokenKey, res.token);
          }
        })
      );
  }

  getToken(): string | null {
    if (!this.isLocalStorageAvailable()) return null;
    return localStorage.getItem(this.tokenKey);
  }

  logout() {
    if (this.isLocalStorageAvailable()) {
      localStorage.removeItem(this.tokenKey);
    }
  }

  async loginAndGetToken(username: string, password: string): Promise<void> {
    await firstValueFrom(this.login(username, password));
  }
}
