import { Routes } from "@angular/router";
import { ProductDetailsComponent } from "./product-details/product-details.component";
import { ShopComponent } from "./shop.component";

export const routes: Routes = [
  {
    path: '',
    component: ShopComponent,
  },
  {
    path: ':id',
    component: ProductDetailsComponent,
  },
];
