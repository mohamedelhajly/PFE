import { APP_INITIALIZER, FactoryProvider } from '@angular/core';
import { EMPTY } from 'rxjs';
import { InitService } from '../../shared/init.service';


export function loadCurrentUserFactory(initService: InitService) {

  const tokenExist: boolean = !!localStorage.getItem('accessToken');

  if (tokenExist) {
    return () => initService.getCurrentUser();
  } else {
    return () =>

      new Promise((resolve, reject) => {
        resolve(EMPTY);
      });
  }
}

export const loadCurrentUserProvider: FactoryProvider = {
  provide: APP_INITIALIZER,
  useFactory: loadCurrentUserFactory,
  deps: [InitService],
  multi: true,
};
