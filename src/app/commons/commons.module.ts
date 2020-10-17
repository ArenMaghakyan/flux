import { CommonModule } from '@angular/common';
import { NgModule, Optional, SkipSelf } from '@angular/core';

import { CommonsComponent } from './commons.component';
import { throwIfAlreadyLoaded } from '../core/utils';
import { CommonsRoutingModule } from './commons.routing.module';
import { PageNotFoundComponent } from './components';

@NgModule({
  imports: [
    CommonModule,
    CommonsRoutingModule,
  ],
  declarations: [
    PageNotFoundComponent,
    CommonsComponent,
  ],
})
export class CommonsModule {
  constructor(@Optional() @SkipSelf() parentModule: CommonsModule) {
    throwIfAlreadyLoaded(parentModule, 'CommonsModule');
  }
}
