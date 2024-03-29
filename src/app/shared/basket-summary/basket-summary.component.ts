import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CartService } from '@cart/cart.service';

import { CartItem } from '../models/cart-item.model';

@Component({
  selector: 'sc-basket-summary',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './basket-summary.component.html',
  styleUrl: './basket-summary.component.scss',
})
export class BasketSummaryComponent {
  @Input() isBasket = true;

  @Output() addItem = new EventEmitter<CartItem>();
  @Output() removeItem = new EventEmitter<{ id: number; quantity: number }>();

  constructor(public readonly cartService: CartService) {}

  addBasketItem(item: CartItem) {
    this.addItem.emit(item);
  }

  removeBasketItem(id: number, quantity = 1) {
    this.removeItem.emit({ id, quantity });
  }
}
