import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SectionHeaderComponent } from '@shared/ui/section-header/section-header.component';

import { NavbarComponent } from './ui/navbar/navbar.component';

@NgModule({
  declarations: [],
  imports: [CommonModule, NavbarComponent, SectionHeaderComponent],
  exports: [NavbarComponent, SectionHeaderComponent],
})
export class CoreModule {}
