import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop.component';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { ShopRoutingModule } from './shop-routing.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ShopComponent,
    ProductItemComponent,
    ShopRoutingModule
  ]
})
export class ShopModule { }
