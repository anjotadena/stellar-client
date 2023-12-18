import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private readonly _http: HttpClient) {}

  get<T>(url: string, params?: HttpParams) {
    return this._http.get<T>(url, { params });
  }

  post<T>(url: string, body: any, options: any) {
    return this._http.post<T>(url, body, options);
  }

  put<T>(url: string, body?: T, options?: any) {
    return this._http.put<T>(url, body, options);
  }

  delete<T>(url: string, options?: any) {
    return this._http.delete<T>(url, options);
  }
}
