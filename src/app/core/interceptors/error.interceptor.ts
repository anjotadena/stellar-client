import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const toastrService = inject(ToastrService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error) {
        console.error(error?.error?.message ?? "Unable to extract error!", error?.status?.toString());
        if (error.status === 400) {
          throw error.error;
        } else {
          toastrService.error(error.error.message, error.status.toString());
        }
        if (error.status === 401) {
          toastrService.error(error.error.message, error.status.toString());
        } else if (error.status === 404) {
          router.navigateByUrl('/not-found');
        } else if (error.status === 500) {
          const navigationExtras: NavigationExtras = {
            state: { error: error.error },
          };

          router.navigateByUrl('/server-error', navigationExtras);
        }
      }

      return throwError(() => new Error(error.message));
    })
  );
};
