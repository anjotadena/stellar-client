import { Component, Input } from '@angular/core';
import { Product } from '../../../product/models/product.model';

@Component({
  selector: 'sc-product-item',
  standalone: true,
  imports: [],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss'
})
export class ProductItemComponent {
  @Input() product: Product | undefined;
}
