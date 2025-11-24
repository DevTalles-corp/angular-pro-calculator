import {
  ApplicationConfig,
  // provideZonelessChangeDetection,
  // provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    // provideZoneChangeDetection({ eventCoalescing: true }),
    // Ya no es necesario porque Angular 21 ya tiene Zoneless Change Detection por defecto
    // provideZonelessChangeDetection(),
    provideRouter(routes),
  ],
};
