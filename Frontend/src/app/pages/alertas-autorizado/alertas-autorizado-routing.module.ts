import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlertasAutorizadoPage } from './alertas-autorizado.page';

const routes: Routes = [
  {
    path: '',
    component: AlertasAutorizadoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlertasAutorizadoPageRoutingModule {}
