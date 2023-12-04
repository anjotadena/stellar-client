import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  formatError(err: HttpErrorResponse): string {
    return this.httpErrorFormatter(err);
  }

  private httpErrorFormatter(err: HttpErrorResponse): string {
    // In a real world app, we may send the error to some remote logging infrastructure
    // instead of just logging it to the console
    // console.error(err);
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      return `An error occurred: ${err.error.message}`;
    }
    return `Server returned code: ${err.status}, error message is: ${err.statusText}`;
  }
}
