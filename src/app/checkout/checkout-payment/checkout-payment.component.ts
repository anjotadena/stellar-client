import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { CartService } from '../../cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { CheckoutService } from '../checkout.service';
import { Cart } from '../../shared/cart';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'sc-checkout-payment',
  standalone: true,
  imports: [CommonModule, SharedModule, ReactiveFormsModule],
  templateUrl: './checkout-payment.component.html',
  styleUrl: './checkout-payment.component.scss',
})
export class CheckoutPaymentComponent {
  @Input() checkoutForm?: FormGroup;

  constructor(
    private readonly _cartService: CartService,
    private readonly _checkoutService: CheckoutService,
    private readonly _toastrService: ToastrService,
    private readonly _router: Router,
  ) {}

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
