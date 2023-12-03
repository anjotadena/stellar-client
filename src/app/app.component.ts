import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { Response } from './shared/models/response.model';
import { Product } from './product/models/product.model';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [CommonModule, RouterOutlet, CoreModule, SharedModule, HttpClientModule]
})
export class AppComponent implements OnInit {
  _http = inject(HttpClient)

  title = 'Stellar';

  ngOnInit(): void {
    this._http.get<Response<Product>>("https://localhost:7136/api/products")
      .subscribe(values => {
        console.log(values.data, "Values!");
      });
  }
}
