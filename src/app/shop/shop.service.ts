import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject, computed } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { PaginatedResponse } from '../shared/models/paginated-response.model';
import { Product } from '../product/models/product.model';
import { catchError, shareReplay, switchMap } from 'rxjs';
import { Brand } from '../shared/models/brand.model';
import { Type } from '../shared/models/type.model';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  static BASE_URL = 'https://localhost:7136/api';

  private _http = inject(HttpClient);
  private _activatedRoute = inject(ActivatedRoute);

  // Products
  private productsResult$ = this._activatedRoute.queryParamMap.pipe(
    shareReplay(),
    switchMap((value) => {
      let params = new HttpParams();
      const brandId = value.get('brandId');
      const typeId = value.get('typeId');

      if (brandId) {
        params = params.append('brandId', brandId);
      }

      if (typeId) {
        params = params.append('typeId', typeId);
      }

      return this._http.get<PaginatedResponse<Product[]>>(
        ShopService.BASE_URL + '/products?pageSize=50',
        { params }
      );
    })
  );
  private brandsResult$ = this._http.get<Brand[]>(
    ShopService.BASE_URL + '/products/brands'
  );
  private typesResult$ = this._http.get<Type[]>(
    ShopService.BASE_URL + '/products/types'
  );

  // selectors
  private productsResult = toSignal(this.productsResult$);
  private brandsResult = toSignal(this.brandsResult$);
  private typesResult = toSignal(this.typesResult$);

  products = computed(() => this.productsResult()?.data);
  brands = computed(() => this.brandsResult());
  types = computed(() => this.typesResult());
}
