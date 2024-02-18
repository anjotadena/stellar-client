import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CartService } from '@app/cart/cart.service';

import { SharedModule } from '@shared/shared.module';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'sc-checkout-review',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './checkout-review.component.html',
  styleUrl: './checkout-review.component.scss',
})
export class CheckoutReviewComponent {
  constructor(
    private readonly _cartService: CartService,
    private readonly _toastrService: ToastrService
  ) {}

  createPaymentIntent() {
    this._cartService.createPaymentIntent().subscribe({
      next: () => this._toastrService.success('Payment intent created!'),
      error: (error) => this._toastrService.error(error?.message),
    });
  }
}
