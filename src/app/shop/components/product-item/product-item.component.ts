import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CartService } from '../../../cart/cart.service';
import { Product } from '../../../product/models/product.model';

@Component({
  selector: 'sc-product-item',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss',
})
export class ProductItemComponent {
  @Input() product: Product | undefined;

  constructor(private readonly _cartService: CartService) {}

  addItemToCart(): void {
    console.log("ADD ITEM TO CART!");
    if (this.product) {
      this._cartService.addItemToCart(this.product);
    }
  }
}
