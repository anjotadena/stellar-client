import { HttpClient } from '@angular/common/http';
import { Injectable, inject, computed } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { PaginatedResponse } from '../shared/models/paginated-response.model';
import { Product } from '../product/models/product.model';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  static BASE_URL = "https://localhost:7136/api";

  private _http = inject(HttpClient);

  private productsResult$ = this._http.get<PaginatedResponse<Product[]>>(ShopService.BASE_URL + "/products");

  // selectors
  private productResult = toSignal(this.productsResult$);

  products = computed(() => this.productResult()?.data);
}
