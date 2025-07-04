import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePadrePage } from './home-padre.page';

const routes: Routes = [
  {
    path: '',
    component: HomePadrePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePadrePageRoutingModule {}
