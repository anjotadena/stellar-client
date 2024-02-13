import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

import { CheckoutService } from '../checkout.service';

@Component({
  selector: 'sc-checkout-delivery',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './checkout-delivery.component.html',
  styleUrl: './checkout-delivery.component.scss',
})
export class CheckoutDeliveryComponent {
  @Input() checkoutForm?: FormGroup;

  deliveryMethods$ = this._checkoutService.getDeliveryMethods();

  constructor(private readonly _checkoutService: CheckoutService) {}
}
