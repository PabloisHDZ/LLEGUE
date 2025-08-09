import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListadoEstudiantesAutorizadoPage } from './listado-estudiantes-autorizado.page';

const routes: Routes = [
  {
    path: '',
    component: ListadoEstudiantesAutorizadoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListadoEstudiantesAutorizadoPageRoutingModule {}
