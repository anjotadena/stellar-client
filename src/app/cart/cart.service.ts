import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { environment } from '../../environments/environment.development';
import { Cart } from '../shared/cart';
import { Product } from '../product/models/product.model';
import { CartItem } from '../shared/models/cart-item.model';
import { CartTotal } from '../shared/models/cart-total.model';
import { DeliveryMethod } from '../shared/models/delivery-method';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private baseUrl = environment.apiUrl;

  private cartSource = new BehaviorSubject<Cart | null>(null);

  cartSource$ = this.cartSource.asObservable();

  private cartTotalSource = new BehaviorSubject<CartTotal | null>(null);

  cartTotalSource$ = this.cartTotalSource.asObservable();

  shipping = 0;

  constructor(private readonly _http: HttpClient) {}

  setShippingPrice(deliveryMethod: DeliveryMethod) {
    this.shipping = deliveryMethod.price;

    this.calculateTotals();
  }

  getCart(id: string) {
    return this._http.get<Cart>(this.baseUrl + '/basket?id=' + id).subscribe({
      next: (cart) => {
        this.cartSource.next(cart);

        this.calculateTotals();
      },
    });
  }

  setCart(cart: Cart) {
    return this._http.post<Cart>(this.baseUrl + '/basket', cart).subscribe({
      next: (cart) => {
        this.cartSource.next(cart);

        this.calculateTotals();
      },
    });
  }

  getCurrentCartValue() {
    return this.cartSource.value;
  }

  addItemToCart(item: Product | CartItem, quantity = 1) {
    if (this.isProduct(item)) {
      item = this.mapProductItem(item);
    }

    const cart = this.getCurrentCartValue() ?? this.createCart();

    cart.items = this.addOrUpdateItem(cart.items, item, quantity);

    this.setCart(cart);
  }

  removeItemFromCart(id: number, quantity = 1) {
    const cart = this.getCurrentCartValue();

    if (!cart) {
      return;
    }

    const item = cart.items.find(i => i.id === id);

    if (item) {
      item.quantity -= quantity;

      if (item.quantity === 0) {
        cart.items = cart.items.filter(i => i.id !== id);
      }

      if (cart.items.length > 0) {
        this.setCart(cart);
      } else {
        this.deleteCart(cart);
      }
    }

    return item;
  }

  private deleteCart(cart: Cart) {
    return this._http.delete(this.baseUrl + "/basket?id=" + cart.id).subscribe({
      next: () => {
        this.cartSource.next(null);
        this.cartTotalSource.next(null);

        localStorage.removeItem("stellar:cart_id");
      }
    })
  }

  private mapProductItem(item: Product): CartItem {
    return {
      quantity: 0,
      brand: item.productBrand,
      type: item.productType,
      pictureUrl: item.pictureUrl,
      productName: item.name,
      id: item.id,
      price: item.price,
    };
  }

  private createCart(): Cart {
    const cart = new Cart();

    localStorage.setItem('stellar:cart_id', cart.id);

    return cart;
  }

  private addOrUpdateItem(
    items: CartItem[],
    itemToAdd: CartItem,
    quantity: number
  ): CartItem[] {
    const item = items.find((x) => x.id === itemToAdd.id);

    if (item) {
      item.quantity += quantity;
    } else {
      itemToAdd.quantity = quantity;

      items.push(itemToAdd);
    }

    return items;
  }

  private calculateTotals() {
    const cart = this.getCurrentCartValue();

    if (!cart) {
      return;
    }

    const subtotal = cart.items.reduce(
      (total, item) => item.price * item.quantity + total,
      0
    );
    const total = this.shipping + subtotal;
    this.cartTotalSource.next({ shipping: this.shipping, subtotal, total });
  }

  private isProduct(item: Product | CartItem): item is Product {
    return (item as Product).productBrand !== undefined;
  }
}
