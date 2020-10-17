import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';

import { RouterModule } from '@angular/router';
import { TokenInterceptor } from './interceptors';
import { throwIfAlreadyLoaded } from './utils';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
  ],
  declarations: [],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
  ],
  exports: [],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
