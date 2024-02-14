import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkStepperModule } from '@angular/cdk/stepper';

import { PaginationHeaderComponent } from './ui/pagination-header/pagination-header.component';
import { SectionHeaderComponent } from './ui/section-header/section-header.component';
import { OrderTotalsComponent } from './ui/order-totals/order-totals.component';
import { TextInputComponent } from './ui/text-input/text-input.component';
import { StepperComponent } from './ui/stepper/stepper.component';
import { BasketSummaryComponent } from './basket-summary/basket-summary.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PaginationHeaderComponent,
    SectionHeaderComponent,
    OrderTotalsComponent,
    TextInputComponent,
    StepperComponent,
    BasketSummaryComponent,
  ],
  exports: [
    PaginationHeaderComponent,
    SectionHeaderComponent,
    OrderTotalsComponent,
    TextInputComponent,
    StepperComponent,
    CdkStepperModule,
    BasketSummaryComponent,
  ],
})
export class SharedModule {}
