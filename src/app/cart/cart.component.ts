import { RouterModule } from '@angular/router';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';
import { CartItem } from '@shared/models/cart-item.model';

import { CartService } from './cart.service';

@Component({
  selector: 'sc-cart',
  standalone: true,
  imports: [CommonModule, RouterModule, SharedModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  constructor(public readonly _cartService: CartService) {}

  addQuantity(item: CartItem) {
    this._cartService.addItemToCart(item);
  }

  removeQuantity(event: { id: number; quantity: number }) {
    this._cartService.removeItemFromCart(event.id, event.quantity);
  }
}
