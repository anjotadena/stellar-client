import { Injectable } from '@angular/core';
import { ReplaySubject, map, of } from 'rxjs';

import { environment } from '../../environments/environment.development';
import { User } from '../shared/models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private currentUserSource = new ReplaySubject<User | null>(1);

  currentUser$ = this.currentUserSource.asObservable();

  constructor(
    private readonly _http: HttpClient,
    private readonly _router: Router
  ) {}

  loadCurrentUser(token: string | null) {
    if (!token) {
      this.currentUserSource.next(null);

      return of(null);
    }

    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);

    return this._http.get<User>(this.baseUrl + '/account', { headers }).pipe(
      map((user) => {
        if (!user) {
          return null;
        }
        localStorage.setItem('token', user.token);
        this.currentUserSource.next(user);
        return user;
      })
    );
  }

  login(values: any) {
    return this._http.post<User>(this.baseUrl + '/account/login', values).pipe(
      map((user) => {
        localStorage.setItem('token', user.token);
        this.currentUserSource.next(user);

        return user;
      })
    );
  }

  register(values: any) {
    return this._http
      .post<User>(this.baseUrl + '/account/register', values)
      .pipe(
        map((user) => {
          localStorage.setItem('token', user.token);
          this.currentUserSource.next(user);
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
    this.currentUserSource.next(null);
    this._router.navigateByUrl('/');
  }

  checkEmailExists(email: string) {
    return this._http.get<boolean>(this.baseUrl + '/account/emailExists?email=' + email);
  }
}
