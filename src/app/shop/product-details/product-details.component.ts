import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

import { CartService } from '@cart/cart.service';

import { ShopService } from '../shop.service';

@Component({
  selector: 'sc-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent implements OnInit {
  _activatedRoute = inject(ActivatedRoute);
  _shopService = inject(ShopService);
  _cartService = inject(CartService);

  product = this._shopService.product;
  quantity = 1;
  cartItemQuantity = toSignal(
    this._cartService.cartSource$.pipe(
      map(
        (cart) =>
          cart?.items.find(
            (i) =>
              i.id === Number(this._activatedRoute.snapshot.paramMap.get('id'))
          )?.quantity
      )
    )
  );

  ngOnInit(): void {
    if (this._activatedRoute.snapshot.paramMap.get('id')) {
      this._shopService.setSelectedProduct(
        +this._activatedRoute.snapshot.paramMap.get('id')!
      );
    }
  }

  addQuantity() {
    const item = this.product();

    if (item) {
      this._cartService.addItemToCart(item, 1);
    }
  }

  removeQuantity() {
    const item = this.product();

    if (item) {
      this._cartService.removeItemFromCart(item.id, 1);
    }
  }
}
