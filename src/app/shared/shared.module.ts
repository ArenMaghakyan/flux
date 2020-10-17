import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TimeToAgePipe } from './pipes';

@NgModule({
  declarations: [TimeToAgePipe],
  imports: [
    CommonModule,
  ],
  exports: [TimeToAgePipe],
})
export class SharedModule {}
