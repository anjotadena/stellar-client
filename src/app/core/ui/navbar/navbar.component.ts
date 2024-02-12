import { Component } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { CartService } from '../../../cart/cart.service';
import { CartItem } from '../../../shared/models/cart-item.model';
import { AccountService } from '../../../account/account.service';

@Component({
  selector: 'sc-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  currentUser = toSignal(this._accountService.currentUser$);

  constructor(
    readonly _cartService: CartService,
    private readonly _accountService: AccountService
  ) {}

  getCount(items: CartItem[]) {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  }

  logout(): void {
    this._accountService.logout();
  }
}
