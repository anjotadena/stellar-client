import { Component, Input } from '@angular/core';
import { Product } from '../../../product/models/product.model';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'sc-product-item',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
  ],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss'
})
export class ProductItemComponent {
  @Input() product: Product | undefined;
}
