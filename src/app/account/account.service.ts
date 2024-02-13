import { Injectable } from '@angular/core';
import { ReplaySubject, map, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment.development';
import { User } from '../shared/models/user.model';
import { Address } from '../shared/models/address.model';

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

    return this._http.get<User>(this.baseUrl + '/account').pipe(
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
    return this._http.get<boolean>(
      this.baseUrl + '/account/emailExists?email=' + email
    );
  }

  getUserAddress() {
    return this._http.get<Address>(this.baseUrl + '/account/address');
  }

  updateUserAddress(address: Address) {
    return this._http.put(this.baseUrl + '/account/address', address);
  }
}
