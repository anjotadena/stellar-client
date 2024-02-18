import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { SharedModule } from '@shared/shared.module';
import { AccountService } from '@account/account.service';

import { CheckoutAddressComponent } from './checkout-address/checkout-address.component';
import { CheckoutDeliveryComponent } from './checkout-delivery/checkout-delivery.component';
import { CheckoutPaymentComponent } from './checkout-payment/checkout-payment.component';
import { CheckoutReviewComponent } from './checkout-review/checkout-review.component';
import { CheckoutSuccessComponent } from './checkout-success/checkout-success.component';
import { CartService } from '@app/cart/cart.service';

@Component({
  selector: 'sc-checkout',
  standalone: true,
  imports: [
    SharedModule,
    CommonModule,
    CheckoutAddressComponent,
    CheckoutDeliveryComponent,
    CheckoutPaymentComponent,
    CheckoutReviewComponent,
    CheckoutSuccessComponent,
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent implements OnInit {
  checkoutForm = this._fb.group({
    addressForm: this._fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', Validators.required],
    }),
    deliveryForm: this._fb.group({
      deliveryMethod: ['', Validators.required],
    }),
    paymentForm: this._fb.group({
      nameOnCard: ['', Validators.required],
    }),
    reviewForm: this._fb.group({
      review: ['', Validators.required],
    }),
  });

  constructor(private readonly _fb: FormBuilder, private readonly _accountService: AccountService, private readonly _cartService: CartService) {}

  ngOnInit(): void {
    this.getAddressFormValues();
    this.getDeliveryMethodValue();
  }

  getAddressFormValues() {
    this._accountService.getUserAddress().subscribe({
      next: address => {
        address && this.checkoutForm.get("addressForm")?.patchValue(address as any);
      }
    });
  }

  getDeliveryMethodValue() {
    const basket = this._cartService.getCurrentCartValue();

    if (basket && basket.deliveryMethod) {
      this.checkoutForm.get("deliveryForm")?.get("deliveryMethod")?.patchValue(basket.deliveryMethod.toString());
    }
  }
}
