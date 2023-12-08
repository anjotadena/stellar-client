import { Component } from '@angular/core';
import { CartService } from '../../../cart/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'sc-order-totals',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-totals.component.html',
  styleUrl: './order-totals.component.scss'
})
export class OrderTotalsComponent {
  constructor(public cartService: CartService) {}
}
