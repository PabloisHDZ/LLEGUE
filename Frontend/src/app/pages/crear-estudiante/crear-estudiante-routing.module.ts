import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearEstudiantePage } from './crear-estudiante.page';

const routes: Routes = [
  {
    path: '',
    component: CrearEstudiantePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearEstudiantePageRoutingModule {}
