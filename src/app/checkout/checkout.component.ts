import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

@Component({
  selector: 'sc-checkout',
  standalone: true,
  imports: [SharedModule, CommonModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent {}
