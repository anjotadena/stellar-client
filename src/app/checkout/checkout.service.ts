import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { DeliveryMethod } from '../shared/models/delivery-method';
import { map } from 'rxjs';
import { Order, OrderToCreate } from '../shared/models/order';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  baseUrl = environment.apiUrl;

  constructor(private readonly _http: HttpClient) {}

  createOrder(order: OrderToCreate) {
    return this._http.post<Order>(this.baseUrl + '/orders', order);
  }

  getDeliveryMethods() {
    return this._http
      .get<DeliveryMethod[]>(this.baseUrl + '/orders/delivery-methods')
      .pipe(map((m) => m.sort((a, b) => b.price - a.price)));
  }
}
