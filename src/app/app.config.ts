import { APP_INITIALIZER, ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { fr_FR, provideNzI18n } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/interceptors/auth.interceptor';

import { InitService } from './shared/init.service';
import { loadCurrentUserFactory } from './core/interceptors/initializer';
import { UserService } from './shared/user.service';
import { errorInterceptor } from './core/error.interceptor';




registerLocaleData(en);

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideNzI18n(fr_FR),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideHttpClient(withInterceptors([errorInterceptor])),
    importProvidersFrom(FormsModule),
    provideAnimationsAsync(),
    provideHttpClient(),
    {
      provide: APP_INITIALIZER,
      useFactory: loadCurrentUserFactory,
      multi: true,
      deps: [UserService,InitService]
    },
  ],
};
function provideNzNotification(): import("@angular/core").Provider | import("@angular/core").EnvironmentProviders {
  throw new Error('Function not implemented.');
}

