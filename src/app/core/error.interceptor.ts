
import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { inject } from '@angular/core';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const notificationService = inject(NzNotificationService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      handleError(error, notificationService);
      return throwError(() => error);
    })
  );
};

function handleError(error: HttpErrorResponse, notificationService: NzNotificationService): void {
  if (error.error && (error.error.message || error.error.errors)) {
    const errorData = error.error;

    if (Array.isArray(errorData.errors)) {
      errorData.errors.forEach((errorMsg: string) => {
        showNotification(errorMsg, notificationService);
      });
    } else if (typeof errorData.errors === 'string') {
      showNotification(errorData.errors, notificationService);
    }

    if (errorData.message) {
      showNotification(errorData.message, notificationService);
    }
  } else {
    showNotification('An error occurred. Please try again later.', notificationService);
  }
}

function showNotification(message: string, notificationService: NzNotificationService): void {
  notificationService.error('Error', message, { nzDuration: 5000 });
}
