import { RouterModule } from '@angular/router';
import { Component, Input } from '@angular/core';
import { CartService } from './cart.service';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { CartItem } from '../shared/models/cart-item.model';

@Component({
  selector: 'sc-cart',
  standalone: true,
  imports: [CommonModule, RouterModule, SharedModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  constructor(public readonly _cartService: CartService) { }

  addQuantity(item: CartItem) {
    this._cartService.addItemToCart(item);
  }

  removeQuantity(id: number, quantity = 1) {
    this._cartService.removeItemFromCart(id, quantity);
  }

}
