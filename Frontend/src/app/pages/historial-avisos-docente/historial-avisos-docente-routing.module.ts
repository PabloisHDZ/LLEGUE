import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HistorialAvisosDocentePage } from './historial-avisos-docente.page';

const routes: Routes = [
  {
    path: '',
    component: HistorialAvisosDocentePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HistorialAvisosDocentePageRoutingModule {}
