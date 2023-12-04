import { Component, OnInit, inject } from '@angular/core';
import { ShopService } from './shop.service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { ProductItemComponent } from "./components/product-item/product-item.component";

@Component({
    selector: 'sc-shop',
    standalone: true,
    templateUrl: './shop.component.html',
    styleUrl: './shop.component.scss',
    imports: [ProductItemComponent]
})
export class ShopComponent {
  private readonly _shopService = inject(ShopService);

  products = this._shopService.products;
}
