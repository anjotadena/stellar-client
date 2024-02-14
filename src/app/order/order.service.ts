import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Order } from '@app/shared/models/order';
import { ShopService } from '@app/shop/shop.service';
import { Observable, filter, map, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  orders$ = this._http.get<Order[]>(ShopService.BASE_URL + '/orders');

  constructor(private readonly _http: HttpClient) {}

  getOrderById(id: number): Observable<Order> {
    return this._http.get<Order>(ShopService.BASE_URL + '/orders/' + id);
  }
}
