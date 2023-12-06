import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, tap, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const router = inject(Router);

      if (error) {
        if (error.status === 404) {
          router.navigateByUrl("/not-found");
        } else if (error.status === 500) {
          router.navigateByUrl("/server-error");
        }
      }

      return throwError(() => new Error(error.message));
    })
  );
};
