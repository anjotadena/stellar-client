import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';

import { environment } from '../../environments/environment.development';
import { User } from '../shared/models/user.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private currentUserSource = new BehaviorSubject<User | null>(null);

  constructor(
    private readonly _http: HttpClient,
    private readonly _router: Router
  ) {}

  login(values: any) {
    return this._http.post<User>(this.baseUrl + '/account/login', values).pipe(
      map((user) => {
        localStorage.setItem('token', user.token);
        this.currentUserSource.next(user);
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

  logout(values: any) {
    localStorage.removeItem('token');
    this.currentUserSource.next(null);
    this._router.navigateByUrl('/');
  }

  checkEmailExists(email: string) {
    return this._http.get<boolean>(this.baseUrl + '/account/emailExists?email=' + email);
  }
}
