import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavbarComponent } from './ui/navbar/navbar.component';
import { SectionHeaderComponent } from '../shared/ui/section-header/section-header.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NavbarComponent,
    SectionHeaderComponent
  ],
  exports: [
    NavbarComponent,
    SectionHeaderComponent
  ]
})
export class CoreModule { }
