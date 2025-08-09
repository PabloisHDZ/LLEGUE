import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlertasDocentePage } from './alertas-docente.page';

const routes: Routes = [
  {
    path: '',
    component: AlertasDocentePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlertasDocentePageRoutingModule {}
