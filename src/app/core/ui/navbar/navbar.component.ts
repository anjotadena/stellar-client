import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CartService } from '../../../cart/cart.service';
import { CommonModule } from '@angular/common';
import { CartItem } from '../../../shared/models/cart-item.model';

@Component({
  selector: 'sc-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  constructor(readonly _cartService: CartService) {}

  getCount(items: CartItem[]) {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  }
}
