import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  inject,
  signal,
} from '@angular/core';
import { ShopService } from './shop.service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { map } from 'rxjs';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../shared/shared.module';

@Component({
  selector: 'sc-shop',
  standalone: true,
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss',
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    NgbPaginationModule,
    ProductItemComponent,
  ],
  providers: [ShopService]
})
export class ShopComponent {
  @ViewChild('search') searchTerm?: ElementRef;

  readonly _shopService = inject(ShopService);
  readonly _activatedRoute = inject(ActivatedRoute);
  readonly _router = inject(Router);

  products = this._shopService.products;
  brands = this._shopService.brands;
  types = this._shopService.types;

  sortOptions = [
    {
      name: 'Price: Low to High',
      value: 'priceAsc',
    },
    {
      name: 'Price: High to Low',
      value: 'priceDesc',
    },
  ];

  brandIdSelected = toSignal(
    this._activatedRoute.queryParamMap.pipe(
      map((v) => Number(v.get('brandId')))
    ),
    { initialValue: 0 }
  );
  typeIdSelected = toSignal(
    this._activatedRoute.queryParamMap.pipe(
      map((v) => Number(v.get('typeId')))
    ),
    { initialValue: 0 }
  );

  handleChangeSort(e: Event): void {
    this._router.navigate([], {
      relativeTo: this._activatedRoute,
      queryParams: { sort: (e.target as HTMLSelectElement).value },
      queryParamsHandling: 'merge',
    });
  }

  handlePageChange(e: number): void {
    this._router.navigate([], {
      relativeTo: this._activatedRoute,
      queryParams: { pageIndex: e },
      queryParamsHandling: 'merge',
    });
  }

  handleSearch(): void {
    const search = this.searchTerm?.nativeElement.value;

    this._router.navigate([], {
      relativeTo: this._activatedRoute,
      queryParams: { search },
      queryParamsHandling: 'merge',
    });
  }

  handleReset(): void {
    (this.searchTerm?.nativeElement as HTMLInputElement).value = "";

    this._router.navigate([], {
      relativeTo: this._activatedRoute,
    });
  }
}
