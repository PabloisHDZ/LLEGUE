import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AvisarLlegadaPage } from './avisar-llegada.page';

const routes: Routes = [
  {
    path: '',
    component: AvisarLlegadaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AvisarLlegadaPageRoutingModule {}
