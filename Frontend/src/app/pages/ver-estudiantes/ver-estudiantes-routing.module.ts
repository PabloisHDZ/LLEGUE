import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerEstudiantesPage } from './ver-estudiantes.page';

const routes: Routes = [
  {
    path: '',
    component: VerEstudiantesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerEstudiantesPageRoutingModule {}
