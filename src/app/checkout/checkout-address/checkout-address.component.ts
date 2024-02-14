import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { AccountService } from '@account/account.service';
import { SharedModule } from '@shared/shared.module';

@Component({
  selector: 'sc-checkout-address',
  standalone: true,
  imports: [SharedModule, CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './checkout-address.component.html',
  styleUrl: './checkout-address.component.scss',
})
export class CheckoutAddressComponent {
  @Input() checkoutForm?: FormGroup;

  constructor(
    private readonly _accountService: AccountService,
    private readonly _toastr: ToastrService
  ) {}

  saveAddress() {
    this._accountService
      .updateUserAddress(this.checkoutForm?.get('addressForm')?.value)
      .subscribe({
        next: () => {
          this._toastr.success('Address Saved!');
          this.checkoutForm
            ?.get('addressForm')
            ?.reset(this.checkoutForm?.get('addressForm')?.value);
        },
      });
  }
}
