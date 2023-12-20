import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { authGuard } from './core/guards/auth.guard';

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
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
