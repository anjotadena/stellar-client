import { PaginationHeaderComponent } from './ui/pagination-header/pagination-header.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionHeaderComponent } from './ui/section-header/section-header.component';
import { OrderTotalsComponent } from './ui/order-totals/order-totals.component';
import { TextInputComponent } from './ui/text-input/text-input.component';

@NgModule({
  declarations: [],
  imports: [CommonModule, PaginationHeaderComponent, SectionHeaderComponent, OrderTotalsComponent, TextInputComponent],
  exports: [PaginationHeaderComponent, SectionHeaderComponent, OrderTotalsComponent, TextInputComponent],
})
export class SharedModule {}
