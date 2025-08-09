import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PerfilAutorizadoPage } from './perfil-autorizado.page';

const routes: Routes = [
  {
    path: '',
    component: PerfilAutorizadoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerfilAutorizadoPageRoutingModule {}
