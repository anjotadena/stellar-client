import { Routes } from '@angular/router';

import { authGuard } from '@core/guards/auth.guard';
import { HomeComponent } from '@home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  // Accounts module
  {
    path: '',
    loadChildren: () => import('./account/account.routes').then(m => m.routes),
  },
  {
    path: 'shop',
    loadChildren: () => import('./shop/shop.routes').then(m => m.routes),
  },
  {
    path: 'cart',
    loadChildren: () => import('./cart/cart.routes').then(m => m.routes),
  },
  {
    path: 'checkout',
    canActivate: [authGuard],
    loadChildren: () => import('./checkout/checkout.routes').then(m => m.routes),
  },
  {
    path: 'orders',
    canActivate: [authGuard],
    loadChildren: () => import('./order/order.routes').then(m => m.routes),
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
