import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CartService } from '@app/cart/cart.service';
import { OrderService } from './order.service';

@Component({
  selector: 'sc-order',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent {
  orders$ = this._orderService.orders$;

  constructor(private readonly _orderService: OrderService) { }
}
