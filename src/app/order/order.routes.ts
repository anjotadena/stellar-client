import { Routes } from '@angular/router';

import { OrderComponent } from './order.component';
import { OrderDetailedComponent } from './order-detailed/order-detailed.component';

export const routes: Routes = [
  {
    path: '',
    component: OrderComponent,
  },
  {
    path: ':id',
    component: OrderDetailedComponent,
  }
];
