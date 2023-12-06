import { Component, Input } from '@angular/core';

@Component({
  selector: 'sc-pagination-header',
  standalone: true,
  imports: [],
  templateUrl: './pagination-header.component.html',
  styleUrl: './pagination-header.component.scss'
})
export class PaginationHeaderComponent {
  @Input() count: number = 0;
  @Input() pageSize: number = 0;
  @Input() currentPage: number = 0;
}
