import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'sc-server-error',
  standalone: true,
  imports: [],
  templateUrl: './server-error.component.html',
  styleUrl: './server-error.component.scss'
})
export class ServerErrorComponent {
  _router = inject(Router);

  constructor() {
    const navigation = this._router.getCurrentNavigation();

    console.log(navigation?.extras?.state?.['error']);
  }
}
