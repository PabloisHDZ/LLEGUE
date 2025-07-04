import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerDocentesPage } from './ver-docentes.page';

const routes: Routes = [
  {
    path: '',
    component: VerDocentesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerDocentesPageRoutingModule {}
