import { HttpClient } from '@angular/common/http';
import { Injectable, inject, computed } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { PaginatedResponse } from '../shared/models/paginated-response.model';
import { Product } from '../product/models/product.model';
import { catchError } from 'rxjs';
import { Brand } from '../shared/models/brand.model';
import { Type } from '../shared/models/type.model';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  static BASE_URL = "https://localhost:7136/api";

  private _http = inject(HttpClient);

  // Products
  private productsResult$ = this._http.get<PaginatedResponse<Product[]>>(ShopService.BASE_URL + "/products");
  private brandsResult$ = this._http.get<Brand[]>(ShopService.BASE_URL + "/products/brands");
  private typesResult$ = this._http.get<Type[]>(ShopService.BASE_URL + "/products/types");

  // selectors
  private productsResult = toSignal(this.productsResult$);
  private brandsResult = toSignal(this.brandsResult$);
  private typesResult = toSignal(this.typesResult$);

  products = computed(() => this.productsResult()?.data);
  brands = computed(() => this.brandsResult());
  types = computed(() => this.typesResult());
}
