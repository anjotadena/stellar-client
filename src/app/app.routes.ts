import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
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
    loadChildren: () => import('./checkout/checkout.routes').then(m => m.routes),
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
