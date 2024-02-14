import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { OrderService } from '../order.service';
import { ActivatedRoute } from '@angular/router';
import { of, switchMap } from 'rxjs';

@Component({
  selector: 'sc-order-detailed',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-detailed.component.html',
  styleUrl: './order-detailed.component.scss',
})
export class OrderDetailedComponent {
  order$ = this._activatedRoute.paramMap.pipe(
    switchMap((paramMap) =>
      paramMap.get('id')
        ? this._orderService.getOrderById(+paramMap.get('id')!)
        : of(null)
    )
  );

  constructor(
    private readonly _orderService: OrderService,
    private readonly _activatedRoute: ActivatedRoute
  ) {}
}
