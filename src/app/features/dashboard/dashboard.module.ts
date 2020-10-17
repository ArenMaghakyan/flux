import { CommonModule } from '@angular/common';
import { NgModule, Optional, SkipSelf } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { throwIfAlreadyLoaded } from '../../core/utils';
import { SharedModule } from '../../shared/shared.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserTableComponent } from './components/user-table/user-table.component';
import { DashboardRoutingModule } from './dashboard.routing.module';
import { UserService } from './shared/services/user/user.service';

@NgModule({
  declarations: [DashboardComponent, UserTableComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NgxDatatableModule,
    SharedModule,
    NgbDatepickerModule,
    ReactiveFormsModule,
  ],
  providers: [UserService],
})

export class DashboardModule {
  constructor(@Optional() @SkipSelf() parentModule: DashboardModule) {
    throwIfAlreadyLoaded(parentModule, 'DashboardModule');
  }
}
