import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HistorialAvisosAutorizadoPage } from './historial-avisos-autorizado.page';

const routes: Routes = [
  {
    path: '',
    component: HistorialAvisosAutorizadoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HistorialAvisosAutorizadoPageRoutingModule {}
