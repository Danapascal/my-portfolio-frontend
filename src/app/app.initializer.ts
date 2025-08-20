import { APP_INITIALIZER, Provider } from '@angular/core';
import { AuthService } from './core/services/AuthService/auth.service';
import { TranslateService } from './core/services/TranslateService/translate.service';

export function initApp(
  authService: AuthService,
  translateService: TranslateService
) {
  return async () => {
    let token = authService.getToken();

    if (!token) {
      //TODO: quitar cuando se agregue pagina de Login
      await authService.loginAndGetToken('admin', '1234');
      token = authService.getToken();
    }
    if (token) {
      const lang = localStorage.getItem('lang');
      if (lang) {
        await translateService.setLanguage(lang);
      } else {
        await translateService.setLanguage('es');
      }

      const data = localStorage.getItem('translations');
      if (data) {
        try {
          translateService.setTranslations(JSON.parse(data));
        } catch {
          console.error('Error al parsear las traducciones');
        }
      }
    } else {
      console.error('No se pudo obtener token para traducciones');
    }
  };
}

export const AppInitProvider: Provider = {
  provide: APP_INITIALIZER,
  useFactory: initApp,
  deps: [AuthService, TranslateService],
  multi: true
};

