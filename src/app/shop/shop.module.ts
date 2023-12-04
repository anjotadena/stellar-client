import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop.component';
import { ProductItemComponent } from './components/product-item/product-item.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ShopComponent,
    ProductItemComponent
  ],
  exports: [
    ShopComponent
  ]
})
export class ShopModule { }
