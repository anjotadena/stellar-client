import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';

import { CoreModule } from '@core/core.module';
import { SharedModule } from '@shared/shared.module';
import { CartService } from '@cart/cart.service';
import { AccountService } from '@account/account.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [CommonModule, RouterOutlet, CoreModule, SharedModule],
})
export class AppComponent implements OnInit {
  title = 'Stellar';

  constructor(
    private readonly _cartService: CartService,
    private readonly _accountService: AccountService,
    private readonly _router: Router
  ) {}

  ngOnInit(): void {
    this.loadCartItems();
    this.loadCurrentUser();
  }

  private loadCartItems() {
    const cartId = localStorage.getItem('stellar:cart_id');

    if (cartId) {
      this._cartService.getCart(cartId);
    }
  }

  private loadCurrentUser() {
    const token = localStorage.getItem('token');
    this._accountService.loadCurrentUser(token).subscribe();
  }
}
