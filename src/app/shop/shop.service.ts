import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject, computed } from '@angular/core';
import { toSignal, takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter, shareReplay, switchMap } from 'rxjs';

import { PaginatedResponse } from '../shared/models/paginated-response.model';
import { Product } from '../product/models/product.model';
import { Brand } from '../shared/models/brand.model';
import { Type } from '../shared/models/type.model';
import { ActivatedRoute, ActivatedRouteSnapshot, ParamMap } from '@angular/router';

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
      const sort = value.get('sort');
      const pageIndex = value.get('pageIndex');
      const search = value.get('search');

      if (brandId) {
        params = params.append('brandId', brandId);
      }

      if (typeId) {
        params = params.append('typeId', typeId);
      }

      if (sort) {
        params = params.append('sort', sort);
      }

      if (pageIndex) {
        params = params.append('pageIndex', pageIndex);
      }

      if (search) {
        params = params.append('search', search);
      }

      return this._http.get<PaginatedResponse<Product[]>>(
        ShopService.BASE_URL + '/products?pageSize=5',
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
  productsPageSize = computed(() => this.productsResult()?.pageSize || 1);
  productsCurrentPage = computed(() => this.productsResult()?.pageIndex || 1);
  productsTotalCount = computed(() => this.productsResult()?.count || 0);
  brands = computed(() => this.brandsResult());
  types = computed(() => this.typesResult());
}
