import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

import { CheckoutService } from '../checkout.service';
import { SharedModule } from '../../shared/shared.module';
import { CartService } from '../../cart/cart.service';
import { DeliveryMethod } from '../../shared/models/delivery-method';

@Component({
  selector: 'sc-checkout-delivery',
  standalone: true,
  imports: [CommonModule, SharedModule, ReactiveFormsModule],
templateUrl: './checkout-delivery.component.html',
  styleUrl: './checkout-delivery.component.scss',
})
export class CheckoutDeliveryComponent {
  @Input() checkoutForm?: FormGroup;

  deliveryMethods$ = this._checkoutService.getDeliveryMethods();

  constructor(private readonly _checkoutService: CheckoutService, private readonly _cartService: CartService) {}

  setShippingPrice(deliveryMethod: DeliveryMethod) {
    this._cartService.setShippingPrice(deliveryMethod);
  }
}
