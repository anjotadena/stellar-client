import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { CartService } from '@cart/cart.service';
import { Cart } from '@shared/cart';
import { SharedModule } from '@shared/shared.module';

import { CheckoutService } from '../checkout.service';
import {
  Stripe,
  StripeCardCvcElement,
  StripeCardExpiryElement,
  StripeCardNumberElement,
  loadStripe,
} from '@stripe/stripe-js';
import { environment } from '@env/environment.development';
import { firstValueFrom } from 'rxjs';
import { OrderToCreate } from '@app/shared/models/order';

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
  loading = false;

  constructor(
    private readonly _cartService: CartService,
    private readonly _checkoutService: CheckoutService,
    private readonly _toastrService: ToastrService,
    private readonly _router: Router
  ) {}

  ngOnInit(): void {
    loadStripe(environment.stripePublishableKey).then((stripe) => {
      this.stripe = stripe;

      const elements = stripe?.elements();

      if (elements) {
        this.cardNumber = elements.create('cardNumber');
        this.cardNumber.mount(this.cardNumberElement?.nativeElement);
        this.cardNumber.on('change', (event) => {
          if (event.error) {
            this.cardErrors = event.error.message;
          } else {
            this.cardErrors = null;
          }
        });

        this.cardExpiry = elements.create('cardExpiry');
        this.cardExpiry.mount(this.cardExpiryElement?.nativeElement);
        this.cardExpiry.on('change', (event) => {
          if (event.error) {
            this.cardErrors = event.error.message;
          } else {
            this.cardErrors = null;
          }
        });

        this.cardCvc = elements.create('cardCvc');
        this.cardCvc.mount(this.cardCvcElement?.nativeElement);
        this.cardCvc.on('change', (event) => {
          if (event.error) {
            this.cardErrors = event.error.message;
          } else {
            this.cardErrors = null;
          }
        });
      }
    });
  }

  async submitOrder() {
    this.loading = true;

    const basket = this._cartService.getCurrentCartValue();

    try {
      const createdOrder = await this._createOrder(basket);

      const paymentResult = await this.confirmPaymentWithStripe(basket);

      if (paymentResult.paymentIntent?.status === 'succeeded') {
        this._cartService.deleteLocalCart();

        const navigationExtras: NavigationExtras = { state: createdOrder };

        this._router.navigate(['checkout/success'], navigationExtras);
      } else {
        this._toastrService.error(paymentResult.error?.message);
      }
    } catch (error: any) {
      console.log(error);
      this._toastrService.error(error?.message);
    } finally {
      this.loading = false;
    }
  }

  private async confirmPaymentWithStripe(basket: Cart | null) {
    if (!basket) {
      throw new Error('Cannot create order without basket');
    }

    const result = await this.stripe
          ?.confirmCardPayment(basket.clientSecret!, {
            payment_method: {
              card: this.cardNumber!,
              billing_details: {
                name: this.checkoutForm?.get('paymentForm')?.get('nameOnCard')
                  ?.value,
              },
            },
          });

    if (!result) {
      throw new Error("Problem attempting payment");
    }

    return result;
  }

  private async _createOrder(basket: Cart | null) {
    if (!basket) {
      throw new Error('Cannot create order without basket');
    }

    const orderToCreate = this._getOrderToCreate(basket);

    return firstValueFrom(this._checkoutService.createOrder(orderToCreate));
  }

  private _getOrderToCreate(basket: Cart): OrderToCreate {
    const deliveryMethod = this.checkoutForm
      ?.get('deliveryForm')
      ?.get('deliveryMethod')?.value;
    const shipToAddress = this.checkoutForm?.get('addressForm')?.value;

    if (!deliveryMethod || !shipToAddress) {
      this._toastrService.error('Please select delivery method and address');
      throw new Error('Problem with basket');
    }

    return {
      basketId: basket.id,
      deliveryMethodId: deliveryMethod,
      shipToAddress: shipToAddress,
    };
  }
}
