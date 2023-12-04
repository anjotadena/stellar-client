import { Component, OnInit, inject } from '@angular/core';
import { ShopService } from './shop.service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'sc-shop',
  standalone: true,
  imports: [],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent implements OnInit {
  private readonly _shopService = inject(ShopService);

  // products = this._shopService.getProducts();

  ngOnInit(): void {
    // this._shopService.getProducts().subscribe();
  }
}
