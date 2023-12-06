import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { ShopModule } from './shop/shop.module';
import { HomeModule } from './home/home.module';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    CommonModule,
    RouterOutlet,
    CoreModule,
    SharedModule,
    ShopModule,
    HomeModule,
  ],
})
export class AppComponent {
  title = 'Stellar';
}
