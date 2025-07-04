import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearPersonaPage } from './crear-persona.page';

const routes: Routes = [
  {
    path: '',
    component: CrearPersonaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearPersonaPageRoutingModule {}
