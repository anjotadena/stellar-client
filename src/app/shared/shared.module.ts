import { PaginationHeaderComponent } from './components/pagination-header/pagination-header.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [CommonModule, PaginationHeaderComponent],
  exports: [PaginationHeaderComponent],
})
export class SharedModule {}
