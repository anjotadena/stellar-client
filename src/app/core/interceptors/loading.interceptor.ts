import { HttpInterceptorFn } from '@angular/common/http';
import { delay, tap } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(tap(() => console.log("HGJGJ")));
};
