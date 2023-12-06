import { Component, OnInit, inject } from '@angular/core';
import { ShopService } from '../shop.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'sc-product-details',
  standalone: true,
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {
  _activatedRoute = inject(ActivatedRoute);
  _shopService = inject(ShopService);

  product = this._shopService.product;

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    if (this._activatedRoute.snapshot.paramMap.get("id")) {
      this._shopService.setSelectedProduct(+this._activatedRoute.snapshot.paramMap.get("id")!);
    }
  }
}
