import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { environment } from '../../environments/environment.development';
import { Cart } from '../shared/cart';
import { Product } from '../product/models/product.model';
import { CartItem } from '../shared/models/cart-item.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private baseUrl = environment.apiUrl;

  private cartSource = new BehaviorSubject<Cart | null>(null);

  cartSource$ = this.cartSource.asObservable();

  constructor(private readonly _http: HttpClient) {}

  getCart(id: string) {
    return this._http.get<Cart>(this.baseUrl + '/basket?id=' + id).subscribe({
      next: (cart) => this.cartSource.next(cart),
    });
  }

  setCart(cart: Cart) {
    return this._http.post<Cart>(this.baseUrl + '/basket', cart).subscribe({
      next: (cart) => this.cartSource.next(cart),
    });
  }

  getCurrentCartValue() {
    return this.cartSource.value;
  }

  addItemToCart(item: Product, quantity = 1) {
    const itemToAdd = this.mapProductItem(item);
    const cart = this.getCurrentCartValue() ?? this.createCart();

    cart.items = this.addOrUpdateItem(cart.items, itemToAdd, quantity);

    this.setCart(cart);
  }

  private mapProductItem(item: Product): CartItem {
    return {
      quantity: 0,
      brand: item.productBrand,
      type: item.productType,
      pictureUrl: item.pictureUrl,
      productName: item.name,
      id: item.id,
      price: item.price
    };
  }

  private createCart(): Cart {
    const cart = new Cart();

    localStorage.setItem('stellar:cart_id', cart.id);

    return cart;
  }

  private addOrUpdateItem(items: CartItem[], itemToAdd: CartItem, quantity: number): CartItem[] {
    const item = items.find(x => x.id === itemToAdd.id);

    if (item) {
      item.quantity += quantity;
    } else {
      itemToAdd.quantity = quantity;

      items.push(itemToAdd);
    }

    return items;
  }
}
