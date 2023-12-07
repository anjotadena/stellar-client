import { Component, Input } from '@angular/core';
import { Product } from '../product/models/product.model';
import { CartService } from './cart.service';

@Component({
  selector: 'sc-cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  @Input() product?: Product;

  constructor(private readonly _cartService: CartService) { }

  addItemToCart() {
    if (this.product) {
      this._cartService.addItemToCart(this.product);
    }
  }
}
