import { CommonModule } from '@angular/common';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { throwIfAlreadyLoaded } from '../../core/utils';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
})

export class DashboardModule {
  constructor(@Optional() @SkipSelf() parentModule: DashboardModule) {
    throwIfAlreadyLoaded(parentModule, 'DashboardModule');
  }
}
