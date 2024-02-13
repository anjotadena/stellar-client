import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'sc-checkout-address',
  standalone: true,
  imports: [SharedModule, CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './checkout-address.component.html',
  styleUrl: './checkout-address.component.scss',
})
export class CheckoutAddressComponent {
  @Input() checkoutForm?: FormGroup;
}
