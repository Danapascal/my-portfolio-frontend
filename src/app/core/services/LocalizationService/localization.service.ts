import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalizationService {
  private readonly translationsKey = 'translations';
  //TODO: crear archivo api-urls con constantes de urls
  // Mover URL base a archivo de configuración
  private apiUrl = 'http://localhost/MyPortfolio/api';

  constructor(private http: HttpClient) {}

  private isLocalStorageAvailable(): boolean {
    try {
      return typeof window !== 'undefined' && !!window.localStorage;
    } catch {
      return false;
    }
  }

  private getToken(): string | null {
    if (!this.isLocalStorageAvailable()) return null;
    return localStorage.getItem('auth_token');
  }

  loadTranslations(lang: string) {
    const token = this.getToken();
    console.log('Token para traducciones:', token);
    const headers = token ? new HttpHeaders().set('Authorization', `Bearer ${token}`) : undefined;

    return this.http.get<Record<string, string>>(`${this.apiUrl}/Localization/${lang}`, { headers })
      .pipe(tap((translations) =>
        this.isLocalStorageAvailable() && localStorage.setItem(this.translationsKey, JSON.stringify(translations))
      ));
  }

  async loadAndSave(lang: string): Promise<void> {
    await firstValueFrom(this.loadTranslations(lang));
  }
}
