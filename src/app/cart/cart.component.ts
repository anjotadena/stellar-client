import { Component, Input } from '@angular/core';
import { CartService } from './cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'sc-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  constructor(public readonly _cartService: CartService) { }
}
