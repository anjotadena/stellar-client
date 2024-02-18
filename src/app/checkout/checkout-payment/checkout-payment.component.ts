import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { CartService } from '@cart/cart.service';
import { Cart } from '@shared/cart';
import { SharedModule } from '@shared/shared.module';

import { CheckoutService } from '../checkout.service';
import { Stripe, StripeCardCvcElement, StripeCardExpiryElement, StripeCardNumberElement, loadStripe } from '@stripe/stripe-js';

@Component({
  selector: 'sc-checkout-payment',
  standalone: true,
  imports: [CommonModule, SharedModule, ReactiveFormsModule],
  templateUrl: './checkout-payment.component.html',
  styleUrl: './checkout-payment.component.scss',
})
export class CheckoutPaymentComponent implements OnInit {
  @ViewChild('cardNumber') cardNumberElement?: ElementRef;
  @ViewChild('cardExpiry') cardExpiryElement?: ElementRef;
  @ViewChild('cardCvc') cardCvcElement?: ElementRef;

  @Input() checkoutForm?: FormGroup;

  stripe: Stripe | null = null;
  cardNumber?: StripeCardNumberElement;
  cardExpiry?: StripeCardExpiryElement;
  cardCvc?: StripeCardCvcElement;
  cardErrors?: any;

  constructor(
    private readonly _cartService: CartService,
    private readonly _checkoutService: CheckoutService,
    private readonly _toastrService: ToastrService,
    private readonly _router: Router
  ) {}

  ngOnInit(): void {
    loadStripe('pk_test_51KfxOmGLD3kMElxsCct2QuQUasU1iM6IBqVOTPyyLbhxeWwaA6VVUdgWrrZnqlB3H9HxdQaTsaczNRw7f8Lhtyog005QXd19uy')
      .then(stripe => {
        this.stripe = stripe;

        const elements = stripe?.elements();

        if (elements) {
          this.cardNumber = elements.create('cardNumber');
          this.cardNumber.mount(this.cardNumberElement?.nativeElement);
          this.cardNumber.on('change', event => {
            if (event.error) {
              this.cardErrors = event.error.message;
            } else {
              this.cardErrors = null;
            }
          });

          this.cardExpiry = elements.create('cardExpiry');
          this.cardExpiry.mount(this.cardExpiryElement?.nativeElement);
          this.cardExpiry.on('change', event => {
            if (event.error) {
              this.cardErrors = event.error.message;
            } else {
              this.cardErrors = null;
            }
          })

          this.cardCvc = elements.create('cardCvc');
          this.cardCvc.mount(this.cardCvcElement?.nativeElement);
          this.cardCvc.on('change', event => {
            if (event.error) {
              this.cardErrors = event.error.message;
            } else {
              this.cardErrors = null;
            }
          })
        }
      })
  }

  submitOrder() {
    const basket = this._cartService.getCurrentCartValue();

    if (!basket) {
      return;
    }

    const orderToCreate = this._getOrderToCreate(basket);

    if (!orderToCreate) {
      return;
    }

    this._checkoutService.createOrder(orderToCreate).subscribe({
      next: (order) => {
        console.log(order);
        this._toastrService.success('Order created successfully');
        this._cartService.deleteLocalCart();

        const navigationExtras: NavigationExtras = { state: order };

        this._router.navigate(['checkout/success'], navigationExtras);
      },
      error: (error) => {
        this._toastrService.error(error);
      },
    });
  }

  private _getOrderToCreate(basket: Cart) {
    const deliveryMethod = this.checkoutForm
      ?.get('deliveryForm')
      ?.get('deliveryMethod')?.value;
    const shipToAddress = this.checkoutForm?.get('addressForm')?.value;

    if (!deliveryMethod || !shipToAddress) {
      this._toastrService.error('Please select delivery method and address');
      return;
    }

    return {
      basketId: basket.id,
      deliveryMethodId: deliveryMethod,
      shipToAddress: shipToAddress,
    };
  }
}
