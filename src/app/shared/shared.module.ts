import { PaginationHeaderComponent } from './ui/pagination-header/pagination-header.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionHeaderComponent } from './ui/section-header/section-header.component';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [],
  imports: [CommonModule, PaginationHeaderComponent, SectionHeaderComponent],
  exports: [PaginationHeaderComponent, SectionHeaderComponent],
})
export class SharedModule {}
