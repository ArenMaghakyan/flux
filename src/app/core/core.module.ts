import { CommonModule } from '@angular/common';
import { NgModule, Optional, SkipSelf } from '@angular/core';

import { throwIfAlreadyLoaded } from '@app/utils';
import { BellNotificationService } from '@core/services';
import { TranslateModule } from '@ngx-translate/core';
import { TruncatePipe } from './pipes';
import { DataService } from './services/static-data';
import { ToastrModule } from 'ngx-toastr';
import { TostrComponent } from './components';


@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    ToastrModule.forRoot({
      toastComponent: TostrComponent,
      timeOut: 2000,
      closeButton: true,
      positionClass: 'toast-bottom-right',
      tapToDismiss: false,
      extendedTimeOut: 4000,
      preventDuplicates: true
    }),
  ],
  declarations: [
    TruncatePipe,
    TostrComponent,
  ],
  entryComponents: [
    TostrComponent
  ],
  providers: [
    DataService,
    BellNotificationService,
  ],
  exports: [
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

}
