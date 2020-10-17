import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CommonsComponent } from './commons.component';
import { PageNotFoundComponent } from './components';

const routes: Routes = [
  {
    path: '', component: CommonsComponent, children: [
      {path: 'page-not-found', component: PageNotFoundComponent},
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommonsRoutingModule {
}
