import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { SharedModule } from '@shared/shared.module';

@Component({
  selector: 'sc-checkout-review',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './checkout-review.component.html',
  styleUrl: './checkout-review.component.scss'
})
export class CheckoutReviewComponent {

}
