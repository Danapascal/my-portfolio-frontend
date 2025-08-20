import { LocalizationService } from './../LocalizationService/localization.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslateService {

  private translations = new Map<string, string>();
  private language = new BehaviorSubject<string>('es');

  constructor(private localizationService: LocalizationService) {}

  language$ = this.language.asObservable();

  setTranslations(translations: Record<string, string>) {
    this.translations = new Map(Object.entries(translations));
  }

  translate(key: string): string {
    return this.translations.get(key) ?? key;
  }

  async setLanguage(lang: string) {
    this.language.next(lang);
    await this.localizationService.loadAndSave(lang);
    const stored = localStorage.getItem('translations');
    if (stored) {
      this.setTranslations(JSON.parse(stored));
    }
    localStorage.setItem('lang', lang);
  }
}
