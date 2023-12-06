import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'sc-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {}
