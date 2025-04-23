import { provideEnvironmentNgxMask } from 'ngx-mask';

import { registerLocaleData } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import ptBr from '@angular/common/locales/pt';
import { ApplicationConfig, LOCALE_ID, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

registerLocaleData(ptBr);

export const appConfig: ApplicationConfig = {
	providers: [
		provideHttpClient(),
		provideEnvironmentNgxMask(),
		provideZoneChangeDetection({ eventCoalescing: true }),
		provideRouter(routes),
		{ provide: LOCALE_ID, useValue: 'pt-BR' },
	],
};
