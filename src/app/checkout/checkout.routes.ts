import { Routes } from "@angular/router";

import { CheckoutComponent } from "./checkout.component";
import { CheckoutSuccessComponent } from "./checkout-success/checkout-success.component";

export const routes: Routes = [
  {
    path: '',
    component: CheckoutComponent,
  },
  {
    path: 'success',
    component: CheckoutSuccessComponent,
  }
];
